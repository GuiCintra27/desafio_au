import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
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

  @Matches(/^[0-9a-fA-F]{24}$/)
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
