import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsData } from './models/products.model';
import { prismaErrorCodes } from 'src/utils/prisma-error-codes';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async findAll(): Promise<ProductsData[]> {
    const products = await this.prismaService.products.findMany({
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
  }

  public async findById({ id }: { id: number }): Promise<ProductsData> {
    try {
      const product = await this.prismaService.products.findUnique({
        where: {
          id,
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

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  public async findByCategoryId({
    categoryId,
  }: {
    categoryId: number;
  }): Promise<ProductsData[]> {
    const products = await this.prismaService.products.findMany({
      where: {
        category_id: categoryId,
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
  }

  public async findByName({ name }: { name: string }): Promise<ProductsData[]> {
    const products = await this.prismaService.products.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
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
  }

  public async findByNameAndCategoryId({
    name,
    categoryId,
  }: {
    name: string;
    categoryId: number;
  }): Promise<ProductsData[]> {
    const products = await this.prismaService.products.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
        category_id: categoryId,
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
  }
}
