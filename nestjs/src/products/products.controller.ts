import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsParamsDto } from './dto/products-params.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { ProductsService } from './products.service';
import { ProductsData } from './models/products.model';
import { CreateProductsDto } from './dto/create-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    { category_id: categoryId, name }: ProductsQueryDto,
  ): Promise<ProductsData[] | ProductsData> {
    let products: ProductsData[] | ProductsData = [];

    try {
      if (categoryId && name) {
        products = await this.productsService.findByNameAndCategoryId({
          name,
          categoryId,
        });
      } else if (categoryId) {
        products = await this.productsService.findByCategoryId({
          categoryId,
        });
      } else if (name) {
        products = await this.productsService.findByName({ name });
      } else {
        products = await this.productsService.findAll();
      }
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/:id')
  async findOne(
    @Param(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    { id }: ProductsParamsDto,
  ): Promise<ProductsData> {
    try {
      const product = await this.productsService.findById({ id });
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  @Post('/')
  @HttpCode(201)
  async create(
    @Body()
    CreateCategoryDto: CreateProductsDto,
  ): Promise<Products> {
    try {
      const category = await this.productsService.create(CreateCategoryDto);
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
    { id }: ProductsParamsDto,
    @Body()
    CreateCategoryDto: CreateProductsDto,
  ): Promise<void> {
    try {
      await this.productsService.update(id, CreateCategoryDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(
    @Param(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    { id }: ProductsParamsDto,
  ): Promise<void> {
    try {
      await this.productsService.delete(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error);
    }
  }
}
