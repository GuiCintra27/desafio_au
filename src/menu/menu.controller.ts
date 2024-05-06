import {
  Controller,
  Get,
  HttpException,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { ProductsData } from 'src/products/models/products.model';
import { MenuParamsDto } from './dto/menu-params.dto';

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

  @Get('category/:id')
  async findCategoryProducts(
    @Param(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    { id: categoryId }: MenuParamsDto,
  ): Promise<ProductsData[]> {
    try {
      console.log(categoryId);
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
