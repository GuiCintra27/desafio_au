import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsFactory } from './factories/products.factory';
import { prismaService } from 'src/utils/prisma-service-test';
import { CategoriesFactory } from 'src/categories/factorires/categories.factory';
import { ConfigModule } from '@nestjs/config';
import { cleanDB } from 'src/utils/clean-db';
import { ProductsData } from './models/products.model';

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
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When no products are created', () => {
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
  });

  describe('When products are created', () => {
    let products: ProductsData[];

    it('when calling findAll, it should return an array with all products', async () => {
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
  });
});
