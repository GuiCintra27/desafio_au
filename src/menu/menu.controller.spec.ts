import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { mockMenuService } from './mocks/menu.mock';

describe('MenuController', () => {
  let controller: MenuController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [PrismaService, MenuService],
    })
      .overrideProvider(MenuService)
      .useValue(mockMenuService)
      .compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  describe('When calling findAll', () => {
    it('should call categoriesService findOne', async () => {
      await controller.findAll();
      expect(mockMenuService.findAll).toHaveBeenCalled();
    });

    it('should return an object with categories and products', async () => {
      const result = await controller.findAll();
      expect(result).toHaveProperty('categories');
      expect(result).toHaveProperty('products');
    });
  });

  describe('When calling findCategoryProducts', () => {
    it('should call categoriesService findCategoryProducts', async () => {
      await controller.findCategoryProducts({ id: 1 });
      expect(mockMenuService.findCategoryProducts).toHaveBeenCalled();
    });

    it('should return an array', async () => {
      const result = await controller.findCategoryProducts({ id: 1 });
      expect(result).toBeInstanceOf(Array);
    });
  });
});
