import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { prismaService } from 'src/utils/prisma-service-test';
import { CategoriesFactory } from 'src/categories/factorires/categories.factory';
import { ConfigModule } from '@nestjs/config';
import { cleanDB } from 'src/utils/clean-db';
import { MenuService } from './menu.service';
import { ProductsFactory } from 'src/products/factories/products.factory';

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

  describe('When no products are created', () => {
    it('when calling findOne, it should return an object with emprty categories array and empty products array', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        categories: [],
        products: [],
      });
    });
  });

  describe('When products are created', () => {
    beforeAll(async () => {
      await factory.createMany({
        quantity: 5,
      });
    });
    it('when calling findOne, it should return an object with an array of categories and an array of products', async () => {
      const result = await service.findAll();

      expect(result).toEqual({
        categories: expect.any(Array),
        products: expect.any(Array),
      });
    });
  });
});
