import { Type } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  category_id: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ALL', 'DAY', 'NIGHT'])
  day_shift: 'ALL' | 'DAY' | 'NIGHT';
}
