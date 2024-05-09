import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { prismaErrorCodes } from 'src/utils/prisma-error-codes';
import { Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<{ id: string }[] & CreateCategoryDto[]> {
    const categories = await this.prismaService.categories.findMany({
      select: { id: true, name: true, image_url: true, day_shift: true },
    });
    return categories;
  }

  async create(data: CreateCategoryDto): Promise<Categories> {
    //I decided to carry out the validation this way, as fewer requests are made to the database
    try {
      const category = await this.prismaService.categories.findUnique({
        where: { name: data.name },
      });

      if (category) {
        throw new ConflictException('Category already exists');
      }

      return await this.prismaService.categories.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: CreateCategoryDto): Promise<void> {
    try {
      let category = await this.prismaService.categories.findUnique({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      category = await this.prismaService.categories.findUnique({
        where: { name: data.name },
      });

      if (category && category.id !== id) {
        throw new ConflictException('Category already exists');
      }

      await this.prismaService.categories.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const category = await this.prismaService.categories.findUnique({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.prismaService.categories.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
