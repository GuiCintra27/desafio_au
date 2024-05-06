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

  describe('When calling findOne', () => {
    it('should call categoriesService findOne', async () => {
      await controller.findOne();
      expect(mockMenuService.findOne).toHaveBeenCalled();
    });

    it('should return an object with categories and products', async () => {
      const result = await controller.findOne();
      expect(result).toHaveProperty('categories');
      expect(result).toHaveProperty('products');
    });
  });
});
