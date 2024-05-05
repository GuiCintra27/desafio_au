import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { prismaService } from 'src/utils/prisma-service-test';
import { CategoriesService } from './categories.service';
import { CategoriesFactory } from './factorires/categories.factory';
import { cleanDB } from 'src/utils/clean-db';
import { ConfigModule } from '@nestjs/config';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const factory = new CategoriesFactory(prismaService);

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
        CategoriesService,
        {
          provide: PrismaService,
          useValue: new PrismaService({
            datasourceUrl: process.env.DATABASE_URL,
          }),
        },
      ],
    }).compile();

    await cleanDB();
    service = module.get<CategoriesService>(CategoriesService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When no categories are created', () => {
    it('when calling findAll, it should return an empty array', async () => {
      await cleanDB();

      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });

    it('when calling update, it should throw an error', async () => {
      await expect(service.update(1, factory.createDTO(1)[0])).rejects.toThrow(
        'Category not found',
      );
    });

    it('when calling delete, it should throw an error', async () => {
      await expect(service.delete(1)).rejects.toThrow('Category not found');
    });

    it('when calling create, it should create a category', async () => {
      const category = await service.create(factory.createDTO(1)[0]);
      expect(category).toBeInstanceOf(Object);
    });
  });

  describe('When categories are created', () => {
    const categoryQuantity = 4;
    let categories: { id: number }[] & CreateCategoryDto[];
    it('when calling findAll, it should return an array with all categories', async () => {
      await cleanDB();
      await factory.createMany(categoryQuantity);
      categories = await service.findAll();

      expect(categories).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: categories[0].name,
            image_url: categories[0].image_url,
          }),
        ]),
      );
      expect(categories.length).toBe(categoryQuantity);
    });

    it('when calling create, it should throw an error', async () => {
      await expect(service.create(categories[0])).rejects.toThrow(
        'Category already exists',
      );
    });

    it('when calling update, it should update a category', async () => {
      const categoryDTO = factory.createDTO(1)[0];
      await service.update(categories[0].id, categoryDTO);
      const result = await service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: categoryDTO.name,
            image_url: categoryDTO.image_url,
          }),
        ]),
      );
    });

    it('when calling delete, it should delete a category', async () => {
      await service.delete(categories[0].id);
      const result = await service.findAll();
      expect(result.length).toBe(categoryQuantity - 1);
    });
  });
});
