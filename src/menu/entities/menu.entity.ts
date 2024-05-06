import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateProductsDto } from 'src/products/dto/create-products.dto';

export class Menu {
  categories: CreateCategoryDto[];
  products: CreateProductsDto[];
}
