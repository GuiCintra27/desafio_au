import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { prismaService } from 'src/utils/prisma-service-test';
import { CategoriesFactory } from 'src/categories/factorires/categories.factory';
import { ConfigModule } from '@nestjs/config';
import { cleanDB } from 'src/utils/clean-db';
import { MenuService } from './menu.service';
import { ProductsFactory } from 'src/products/factories/products.factory';
import { Categories, Products } from '@prisma/client';

describe('ProductsService', () => {
  let service: MenuService;
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
        MenuService,
        {
          provide: PrismaService,
          useValue: new PrismaService({
            datasourceUrl: process.env.DATABASE_URL,
          }),
        },
      ],
    }).compile();

    await cleanDB();
    service = module.get<MenuService>(MenuService);
  });

  afterAll(async () => {
    await cleanDB();
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When no categories and no products are created', () => {
    it('when calling findAll, it should return an object with empty categories array and empty products array', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        categories: [],
        products: [],
      });
    });

    it('when calling findCategoryProducts, it should throw an error', async () => {
      await expect(
        service.findCategoryProducts({ categoryId: 1 }),
      ).rejects.toThrow('Category not found');
    });
  });

  describe('When categories are created', () => {
    let categories: Omit<Categories, 'created_at' | 'updated_at'>[];

    beforeAll(async () => {
      await categoryFactory.createMany(5);
      categories = await categoryFactory.findMany();
    });
    it('when calling findAll, it should return an object with an array of categories and an empty array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        categories: expect.any(Array),
        products: [],
      });
      expect(result.categories).toHaveLength(5);
    });

    it('when calling findCategoryProducts, it should return an array of products', async () => {
      const result = await service.findCategoryProducts({
        categoryId: categories[0].id,
      });
      expect(result).toEqual(expect.any(Array));
      expect(result).toHaveLength(0);
    });
  });

  describe('When products are created', () => {
    const quantity = 5;
    const repeatedCategory = 2;
    let products: Products[];

    beforeAll(async () => {
      await cleanDB();
      await factory.createMany({
        quantity,
        repeatCategory: {
          quantity: repeatedCategory,
        },
      });
      products = await factory.findMany();
    });

    it('when calling findOne, it should return an object with an array of categories and an array of products', async () => {
      const result = await service.findAll();

      expect(result).toEqual({
        categories: expect.any(Array),
        products: expect.any(Array),
      });

      expect(result.products).toHaveLength(quantity);
      expect(result.categories).toHaveLength(quantity);
    });

    it('when calling findCategoryProducts, it should return an array of products', async () => {
      const result = await service.findCategoryProducts({
        categoryId: products[0].category_id,
      });
      expect(result).toEqual(expect.any(Array));
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: products[0].id,
        name: products[0].name,
        description: products[0].description,
        image_url: products[0].image_url,
        price: products[0].price,
        category_id: products[0].category_id,
        day_shift: products[0].day_shift,
      });
    });
  });
});
