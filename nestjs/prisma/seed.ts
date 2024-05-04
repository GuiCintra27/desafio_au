// prisma/seed.ts
import { Category, Prisma, PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

function generateRandomValue(min: number, max: number): number {
  // Generate a random value with two decimal places
  const randomValue = Math.random() * (max - min) + min;

  // Round to two decimal places
  const roundedValue = Math.round(randomValue * 100) / 100;

  return roundedValue;
}

export async function seed(): Promise<void> {
  try {
    let category: Category[] | Prisma.BatchPayload =
      await prisma.category.findMany();
    const product: Product[] = await prisma.product.findMany();

    if (category.length === 0) {
      category = await prisma.category.createMany({
        data: [
          {
            name: 'Combo',
            image_url: 'https://i.imgur.com/tvVjOwR.png',
            day_shift: 'ALL',
          },
          {
            name: 'Acompanhamentos',
            image_url: 'https://i.imgur.com/iy5jIZB.png',
            day_shift: 'ALL',
          },
          {
            name: 'Bebidas',
            image_url: 'https://i.imgur.com/mYKwdU0.png',
            day_shift: 'ALL',
          },
          {
            name: 'Sobremesas',
            image_url: 'https://i.imgur.com/MFzVJCi.png',
            day_shift: 'ALL',
          },
        ],
      });
    }

    if (product.length === 0) {
      const products: Omit<Product, 'id' | 'created_at' | 'updated_at'>[] = [];

      for (let i = 0; i < 20; i += 1) {
        const price = generateRandomValue(15, 100);
        const id = generateRandomValue(0, 3).toFixed(0);

        products.push({
          name: `Smash da casa ${i}`,
          description:
            '2x hambúrguer 200g, queijo cheddar, tomate, alface, picles, cebola e molho da casa',
          price,
          image_url: 'https://i.imgur.com/PTgAjYJ.png',
          day_shift: 'ALL',
          category_id: category[id].id,
        });
      }

      await prisma.product.createMany({
        data: products,
      });
    }

    // eslint-disable-next-line no-console
    console.log('Seeding completed successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`\nError seeding database: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
