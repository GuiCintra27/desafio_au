import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsFactory } from './factories/products.factory';
import { prismaService } from 'src/utils/prisma-service-test';
import { CategoriesFactory } from 'src/categories/factorires/categories.factory';
import { ConfigModule } from '@nestjs/config';
import { cleanDB } from 'src/utils/clean-db';
import { ProductsData } from './models/products.model';
import { Categories } from '@prisma/client';
import { faker } from '@faker-js/faker';

describe('ProductsService', () => {
  let service: ProductsService;
  const categoryFactory = new CategoriesFactory(prismaService);
  const factory = new ProductsFactory(prismaService, categoryFactory);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', `.env.${process.env.ENV}`],
          expandVariables: true,
          isGlobal: true,
        }),
      ],
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: new PrismaService({
            datasourceUrl: process.env.DATABASE_URL,
          }),
        },
      ],
    }).compile();

    await cleanDB();
    service = module.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    await cleanDB();
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When no products are created', () => {
    let categories: Omit<Categories, 'created_at' | 'updated_at'>[];
    it(' when calling findAll, it should return an empty array', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('when calling findById, it should throw an error', async () => {
      await expect(service.findById({ id: 1 })).rejects.toThrow(
        'Product not found',
      );
    });

    it('when calling findByCategoryId, it should return an empty array', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('when calling findByName, it should return an empty array', async () => {
      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('when calling findByNameAndCategoryId, it should return an empty array', async () => {
      const result = await service.findByNameAndCategoryId({
        name: 'Product 1',
        categoryId: 1,
      });
      expect(result).toEqual([]);
    });

    it('when calling update, it should throw an error', async () => {
      await categoryFactory.createMany(4);
      categories = await categoryFactory.findMany();

      await expect(
        service.update(1, {
          ...factory.createDTO(1)[0],
          category_id: categories[0].id,
        }),
      ).rejects.toThrow('Product not found');
    });

    it('when calling delete, it should throw an error', async () => {
      await expect(service.delete(1)).rejects.toThrow('Product not found');
    });

    it('when calling create, it should create a product', async () => {
      const product = await service.create({
        ...factory.createDTO(1)[0],
        category_id: categories[0].id,
      });
      expect(product).toBeInstanceOf(Object);
    });
  });

  describe('When products are created', () => {
    let products: ProductsData[];

    it('when calling findAll, it should return an array with all products', async () => {
      await cleanDB();

      products = await factory.createMany({
        quantity: 4,
        repeatCategory: { quantity: 2 },
        repeatName: { quantity: 2 },
      });
      const result = await service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: products[0].name,
            image_url: products[0].image_url,
            description: products[0].description,
            price: products[0].price,
            category_id: products[0].category_id,
          }),
        ]),
      );
    });

    it('when calling findById, it should return only the specified product', async () => {
      const result = await service.findById({ id: products[0].id });

      expect(result).toEqual(products[0]);
    });

    it('when calling findByCategoryId, it should only return products from the specified category', async () => {
      const result = await service.findByCategoryId({
        categoryId: products[0].category_id,
      });

      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(products[0]);
    });

    it('when calling findByName, it should only return products with the specified name', async () => {
      const repeatedName = products[1].name.slice(
        0,
        products[1].name.length - 3,
      );
      const result = await service.findByName({ name: repeatedName });

      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(products[1]);
    });

    it('when calling findByNameAndCategoryId, it should only return products with the specified name and category', async () => {
      const result = await service.findByNameAndCategoryId({
        name: products[1].name,
        categoryId: products[0].category_id,
      });

      expect(result.length).toBe(1);
      expect(result[0]).toEqual(products[1]);
    });

    describe('when calling update', () => {
      it('should update a product', async () => {
        const newName = faker.person.firstName();
        await service.update(products[0].id, { ...products[0], name: newName });

        const result = await service.findById({ id: products[0].id });

        expect(result).toEqual({
          ...products[0],
          name: newName,
        });
      });

      it('should throw an error if the product already exist', async () => {
        await expect(
          service.update(products[0].id, {
            ...products[0],
            name: products[1].name,
          }),
        ).rejects.toThrow('Product already exists');
      });
    });

    it('when calling delete, it should delete a product', async () => {
      await service.delete(products[0].id);
      const result = await service.findAll();
      expect(result.length).toBe(products.length - 1);
      await expect(service.findById({ id: products[0].id })).rejects.toThrow(
        'Product not found',
      );
    });

    describe('when calling create', () => {
      it('should create a product', async () => {
        const product = await service.create({
          ...factory.createDTO(1)[0],
          category_id: products[0].category_id,
        });
        expect(product).toBeInstanceOf(Object);
      });

      it('should throw an error if the product already exist', async () => {
        await expect(service.create(products[1])).rejects.toThrow(
          'Product already exists',
        );
      });
    });
  });
});
