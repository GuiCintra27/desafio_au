export const mockMenuService = {
  findAll: jest.fn().mockImplementation(() => {
    return {
      categories: [],
      products: [],
    };
  }),
  findCategoryProducts: jest.fn().mockImplementation(() => {
    return [];
  }),
};
