import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Menu } from './entities/menu.entity';
import { ProductsData } from 'src/products/models/products.model';
import { prismaErrorCodes } from 'src/utils/prisma-error-codes';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Menu> {
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

  async findCategoryProducts({
    categoryId,
  }: {
    categoryId: number;
  }): Promise<ProductsData[]> {
    try {
      const date = new Date();
      const isNight = date.getHours() >= 18;

      const products = await this.prismaService.products.findMany({
        where: {
          category_id: categoryId,
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

      return products;
    } catch (error) {
      if (error.code === prismaErrorCodes.notFound) {
        throw new NotFoundException('Category not found');
      }

      throw error;
    }
  }
}
