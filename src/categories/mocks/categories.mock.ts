export const mockCategoriesService = {
  findAll: jest.fn().mockImplementation(() => []),
  create: jest.fn().mockImplementation(() => {
    return {};
  }),
  update: jest.fn().mockImplementation(),
  delete: jest.fn().mockImplementation(),
};
