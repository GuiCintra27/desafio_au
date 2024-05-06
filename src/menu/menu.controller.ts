import { Controller, Get, HttpException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { ProductsData } from 'src/products/models/products.model';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<Menu> {
    try {
      const result = await this.menuService.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('category/:categoryId')
  async findCategoryProducts({
    categoryId,
  }: {
    categoryId: number;
  }): Promise<ProductsData[]> {
    try {
      const result = await this.menuService.findCategoryProducts({
        categoryId,
      });

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
