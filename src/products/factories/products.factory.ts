import { faker } from '@faker-js/faker';
import { Categories, Products } from '@prisma/client';
import { CategoriesFactory } from 'src/categories/factorires/categories.factory';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsData } from '../models/products.model';

export class ProductsFactory {
  constructor(
    private readonly prismaService?: PrismaService,
    private categoriesFactory?: CategoriesFactory,
  ) {}

  public createDTO(quantity: number): Omit<ProductsData, 'id'>[] {
    const products: Omit<ProductsData, 'id'>[] = [];
    for (let i = 0; i < quantity; i += 1) {
      products.push({
        name: faker.person.firstName(),
        description: faker.lorem.sentence(),
        price: faker.number.float({ fractionDigits: 2 }),
        category_id: faker.database.mongodbObjectId(),
        image_url: faker.image.url(),
        day_shift: faker.helpers.arrayElement(['ALL', 'DAY', 'NIGHT']),
      });
    }
    return products;
  }

  public async createMany({
    quantity,
    repeatCategory,
    repeatName,
  }: {
    quantity: number;
    repeatCategory?: { quantity: number };
    repeatName?: { quantity: number };
  }): Promise<ProductsData[]> {
    await this.categoriesFactory.createMany(quantity);

    const categories: Omit<Categories, 'created_at' | 'updated_at'>[] =
      await this.categoriesFactory.findMany();

    const products: ProductsData[] = [];

    let nameCount = 0;
    let categoryCount = 0;

    for (let i = 0; i < quantity; i += 1) {
      let categoryId = categories[i].id;
      let name = faker.person.firstName();

      if (repeatCategory && repeatCategory.quantity > categoryCount) {
        categoryCount++;
        categoryId = categories[0].id;
      }

      if (repeatName && i > 0 && repeatName.quantity > nameCount) {
        nameCount++;
        name = `Repeated Name ${i}`;
      }

      products.push({
        id: faker.database.mongodbObjectId(),
        name,
        description: faker.lorem.sentence(),
        price: faker.number.int({ min: 1, max: 100 }),
        image_url: faker.image.avatar(),
        category_id: categoryId,
        day_shift: 'ALL',
      });
    }

    await this.prismaService.products.createMany({
      data: products,
    });

    return products;
  }

  public async findMany(): Promise<Products[]> {
    const products = await this.prismaService.products.findMany();
    return products;
  }
}
