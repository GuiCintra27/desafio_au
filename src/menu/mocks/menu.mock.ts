export const mockMenuService = {
  findOne: jest.fn().mockImplementation(() => {
    return {
      categories: [],
      products: [],
    };
  }),
};
