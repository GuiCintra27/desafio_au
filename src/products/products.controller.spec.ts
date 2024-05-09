import { Test, TestingModule } from '@nestjs/testing';
import { mockProductsService } from './mocks/products-service.mock';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsFactory } from './factories/products.factory';

describe('ProductsController', () => {
  let controller: ProductsController;
  const factory = new ProductsFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When calling findAll', () => {
    describe('When no parameters are given', () => {
      it('It should call productsService findAll', () => {
        controller.findAll({});
        expect(mockProductsService.findAll).toHaveBeenCalled();
      });

      it('It should return an array', async () => {
        const result = await controller.findAll({});
        expect(result).toBeInstanceOf(Array);
      });
    });

    describe('When parameters are given', () => {
      describe('if name is given', () => {
        it('It should call productsService findByName', () => {
          controller.findAll({ name: 'test' });
          expect(mockProductsService.findByName).toHaveBeenCalled();
        });

        it('It should return an array', async () => {
          const result = await controller.findAll({ name: 'test' });
          expect(result).toBeInstanceOf(Array);
        });
      });

      describe('if categoryId is given', () => {
        it('It should call productsService findByCategoryId', () => {
          controller.findAll({ category_id: '1' });
          expect(mockProductsService.findByCategoryId).toHaveBeenCalled();
        });

        it('It should return an array', async () => {
          const result = await controller.findAll({ category_id: '1' });
          expect(result).toBeInstanceOf(Array);
        });
      });

      describe('if name and categoryId are given', () => {
        it('It should call productsService findByNameAndCategoryId', () => {
          controller.findAll({ name: 'test', category_id: '1' });
          expect(
            mockProductsService.findByNameAndCategoryId,
          ).toHaveBeenCalled();
        });

        it('It should return an array', async () => {
          const result = await controller.findAll({
            name: 'test',
            category_id: '1',
          });
          expect(result).toBeInstanceOf(Array);
        });
      });
    });
  });

  describe('When calling findOne', () => {
    it('if id is given, it should call productsService findById', () => {
      controller.findOne({ id: '1' });
      expect(mockProductsService.findById).toHaveBeenCalled();
    });

    it('if id is given, it should return an object', async () => {
      const result = await controller.findOne({ id: '1' });
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('When calling create', () => {
    it('should call productsService create', () => {
      controller.create(factory.createDTO(1)[0]);
      expect(mockProductsService.create).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const result = await controller.create(factory.createDTO(1)[0]);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('When calling update', () => {
    it('should call productsService update', () => {
      controller.update({ id: '1' }, factory.createDTO(1)[0]);
      expect(mockProductsService.update).toHaveBeenCalled();
    });

    it('should return undefined', async () => {
      const result = await controller.update(
        { id: '1' },
        factory.createDTO(1)[0],
      );
      expect(result).toBeUndefined();
    });
  });

  describe('When calling delete', () => {
    it('should call productsService delete', () => {
      controller.delete({ id: '1' });
      expect(mockProductsService.delete).toHaveBeenCalled();
    });

    it('should return undefined', async () => {
      const result = await controller.delete({ id: '1' });
      expect(result).toBeUndefined();
    });
  });
});
