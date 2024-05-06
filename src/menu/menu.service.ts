import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(): Promise<Menu> {
    const date = new Date();
    const isNight = date.getHours() >= 18;

    const categories = await this.prismaService.categories.findMany({
      where: {
        OR: [{ day_shift: isNight ? 'NIGHT' : 'DAY' }, { day_shift: 'ALL' }],
      },
      select: {
        id: true,
        name: true,
        image_url: true,
        day_shift: true,
      },
    });

    const products = await this.prismaService.products.findMany({
      where: {
        OR: [{ day_shift: isNight ? 'NIGHT' : 'DAY' }, { day_shift: 'ALL' }],
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true,
        image_url: true,
        day_shift: true,
      },
    });

    const result = {
      categories,
      products,
    };

    return result;
  }
}
