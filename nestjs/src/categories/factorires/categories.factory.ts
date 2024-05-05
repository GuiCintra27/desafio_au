import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Categories, Prisma } from '@prisma/client';

export class CategoriesFactory {
  constructor(private prismaService?: PrismaService) {}

  createDTO(quantity: number): CreateCategoryDto[] {
    const categories: CreateCategoryDto[] = [];
    for (let i = 0; i < quantity; i++) {
      categories.push({
        name: faker.person.firstName(),
        image_url: faker.image.url(),
        day_shift: 'ALL',
      });
    }
    return categories;
  }

  async createMany(quantity: number): Promise<CreateCategoryDto[]> {
    const categories = this.createDTO(quantity);

    try {
      await this.prismaService.categories.createMany({
        data: categories,
      });

      return categories;
    } catch (error) {
      throw error;
    }
  }

  async createOne(): Promise<void> {
    const category = this.createDTO(1);
    await this.prismaService.categories.create({
      data: category[0],
    });
  }

  async findMany(): Promise<Omit<Categories, 'created_at' | 'updated_at'>[]> {
    const categories = await this.prismaService.categories.findMany({
      select: {
        id: true,
        name: true,
        image_url: true,
        day_shift: true,
      },
    });
    return categories;
  }
}
