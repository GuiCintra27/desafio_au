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

  async create(data: CreateProductsDto): Promise<Products> {
    //I decided to carry out the validation this way, as fewer requests are made to the database
    try {
      return await this.prismaService.products.create({
        data,
      });
    } catch (error) {
      if (error.code === prismaErrorCodes.conflict) {
        throw new ConflictException('Product already exists');
      }
      throw error;
    }
  }

  async update(id: number, data: CreateProductsDto): Promise<void> {
    try {
      await this.prismaService.products.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === prismaErrorCodes.notFound) {
        throw new NotFoundException('Category not found');
      }

      if (error.code === prismaErrorCodes.conflict) {
        throw new ConflictException('Product already exists');
      }

      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prismaService.products.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === prismaErrorCodes.notFound) {
        throw new NotFoundException('Product not found');
      }

      throw error;
    }
  }
}
