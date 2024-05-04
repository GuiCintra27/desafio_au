import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  async findAll() {
    try {
      const categories = await this.categoriesService.findAll();
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  async create(
    @Body()
    CreateCategoryDto: CreateCategoryDto,
  ) {
    try {
      const category = await this.categoriesService.create(CreateCategoryDto);
      return category;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
