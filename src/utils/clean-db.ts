import { prismaService } from './prisma-service-test';

export async function cleanDB() {
  try {
    await Promise.all([cleanProducts(), cleanCategories()]);
  } catch (error) {
    console.error('Failed to clean database:', error);
    throw new Error('Database cleanup failed');
  }
}

async function cleanCategories() {
  try {
    await prismaService.categories.deleteMany();
  } catch (error) {
    console.error('Failed to clean categories:', error);
    throw new Error('Failed to clean categories');
  }
}

async function cleanProducts() {
  try {
    await prismaService.products.deleteMany();
  } catch (error) {
    console.error('Failed to clean products:', error);
    throw new Error('Failed to clean products');
  }
}
