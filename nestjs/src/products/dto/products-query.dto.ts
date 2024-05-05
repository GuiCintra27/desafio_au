import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProductsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly category_id?: number;

  @IsOptional()
  @IsString()
  public readonly name?: string;
}
