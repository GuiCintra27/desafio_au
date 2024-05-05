export const mockProductsService = {
  findAll: jest.fn().mockImplementation(() => []),
  findByName: jest.fn().mockImplementation(() => []),
  findByNameAndCategoryId: jest
    .fn()
    .mockImplementation(() => Promise.resolve([])),
  findById: jest.fn().mockImplementation(() => Promise.resolve({})),
  findByCategoryId: jest.fn().mockImplementation(() => Promise.resolve([])),
  create: jest.fn().mockImplementation(() => {
    return {};
  }),
  update: jest.fn().mockImplementation(),
  delete: jest.fn().mockImplementation(),
};
