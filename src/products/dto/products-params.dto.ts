import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ProductsParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly id?: number;
}
