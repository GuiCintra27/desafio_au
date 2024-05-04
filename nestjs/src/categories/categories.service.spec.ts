// import { Test, TestingModule } from '@nestjs/testing';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';
// import { CategoriesFactory } from '../../test/factories/category.factory';
// import { cleanDB } from '../../test/utils/clean-db';
// import { prismaService } from '../../test/utils/prisma-service-test';
// import { CategoriesService } from './categories.service';

// describe('CategoriesService', () => {
//   let service: CategoriesService;
//   const factory = new CategoriesFactory(prismaService);

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CategoriesService,
//         {
//           provide: PrismaService,
//           useValue: new PrismaService({
//             datasourceUrl: process.env.DATABASE_TEST_URL,
//           }),
//         },
//       ],
//     }).compile();

//     service = module.get<CategoriesService>(CategoriesService);
//   });

//   afterAll(async () => {
//     await prismaService.$disconnect();
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('When no categories are created', () => {
//     it('when calling findAll, it should return an empty array', async () => {
//       await cleanDB();

//       const result = await service.findAll();
//       expect(result).toBeInstanceOf(Array);
//       expect(result.length).toBe(0);
//     });
//   });

//   describe('When categories are created', () => {
//     it('when calling findAll, it should return an array with all categories', async () => {
//       cleanDB();
//       const categories = await factory.createMany();
//       const result = await service.findAll();

//       expect(result).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({
//             name: categories[0].name,
//             image_url: categories[0].image_url,
//           }),
//         ]),
//       );
//       expect(result.length).toBe(4);
//     });
//   });
// });
