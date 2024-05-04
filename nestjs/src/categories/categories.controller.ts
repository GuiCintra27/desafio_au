import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ParamUpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  async findAll(): Promise<CreateCategoryDto[]> {
    try {
      const categories = await this.categoriesService.findAll();
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/')
  @HttpCode(201)
  async create(
    @Body()
    CreateCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
    try {
      const category = await this.categoriesService.create(CreateCategoryDto);
      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  @Put('/:id')
  @HttpCode(204)
  async update(
    @Param(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    { id }: ParamUpdateCategoryDto,
    @Body()
    CreateCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    try {
      await this.categoriesService.update(id, CreateCategoryDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
