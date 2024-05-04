export class CategoriesFactory {
  constructor() {}

  async create(quantity: number) {
    const categories = [];
    for (let i = 0; i < quantity; i++) {
      categories.push({
        name: `Category ${i}`,
        image_url: 'https://example.com/image.png',
        day_shift: 'ALL',
      });
    }
    return categories;
  }
}
