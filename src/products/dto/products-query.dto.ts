import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class ProductsQueryDto {
  @IsOptional()
  @IsMongoId()
  public readonly category_id?: string;

  @IsOptional()
  @IsString()
  public readonly name?: string;
}
