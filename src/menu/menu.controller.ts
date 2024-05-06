import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { ProductsData } from 'src/products/models/products.model';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(): Promise<Menu> {
    return this.menuService.findAll();
  }

  @Get('category/:categoryId')
  findCategoryProducts({
    categoryId,
  }: {
    categoryId: number;
  }): Promise<ProductsData[]> {
    return this.menuService.findCategoryProducts({ categoryId });
  }
}
