import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsData } from './models/products.model';
import { prismaErrorCodes } from 'src/utils/prisma-error-codes';
import { CreateProductsDto } from './dto/create-products.dto';
import { Products } from '@prisma/client';

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

  public async findById({ id }: { id: string }): Promise<ProductsData> {
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
    categoryId: string;
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
    categoryId: string;
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

  async create(data: CreateProductsDto): Promise<Products> {
    try {
      const product = await this.prismaService.products.findUnique({
        where: {
          name: data.name,
        },
      });

      if (product) {
        throw new ConflictException('Product already exists');
      }

      return await this.prismaService.products.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: CreateProductsDto): Promise<void> {
    try {
      let product = await this.prismaService.products.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      product = await this.prismaService.products.findUnique({
        where: { name: data.name },
      });

      if (product && product.id !== id) {
        throw new ConflictException('Product already exists');
      }

      await this.prismaService.products.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const product = await this.prismaService.products.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.prismaService.products.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
