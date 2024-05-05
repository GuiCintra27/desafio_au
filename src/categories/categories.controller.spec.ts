import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { mockCategoriesService } from './mocks/categories.mock';
import { CategoriesFactory } from './factorires/categories.factory';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const categoriesFactory = new CategoriesFactory();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [PrismaService, CategoriesService],
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

  describe('When calling create', () => {
    it('should call categoriesService create', async () => {
      await controller.create(categoriesFactory.createDTO(1)[0]);
      expect(mockCategoriesService.create).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const result = await controller.create(categoriesFactory.createDTO(1)[0]);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('When calling update', () => {
    it('should call categoriesService update', async () => {
      await controller.update({ id: 1 }, categoriesFactory.createDTO(1)[0]);
      expect(mockCategoriesService.update).toHaveBeenCalled();
    });

    it('should return undefined', async () => {
      const result = await controller.update(
        { id: 1 },
        categoriesFactory.createDTO(1)[0],
      );
      expect(result).toBeUndefined();
    });
  });

  describe('When calling delete', () => {
    it('should call categoriesService delete', async () => {
      await controller.delete({ id: 1 });
      expect(mockCategoriesService.delete).toHaveBeenCalled();
    });

    it('should return undefined', async () => {
      const result = await controller.delete({ id: 1 });
      expect(result).toBeUndefined();
    });
  });
});
