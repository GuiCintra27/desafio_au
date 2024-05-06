import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findOne(): Promise<Menu> {
    return this.menuService.findOne();
  }
}
