import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { mockCategoriesService } from './mocks/categories.mock';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, PrismaService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('When calling findAll', () => {
    it('should call categoriesService findAll', async () => {
      await controller.findAll();
      expect(mockCategoriesService.findAll).toHaveBeenCalled();
    });

    it('should return an array', async () => {
      const result = await controller.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
