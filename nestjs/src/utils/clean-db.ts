import { prismaService } from './prisma-service-test';

export async function cleanDB() {
  try {
    await prismaService.$transaction([
      prismaService.categories.deleteMany(),
      prismaService.products.deleteMany(),
    ]);
  } catch (error) {
    throw new Error(error);
  }
}
