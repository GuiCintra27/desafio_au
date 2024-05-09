import { IsOptional, IsString, Matches } from 'class-validator';

export class ProductsQueryDto {
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/)
  public readonly category_id?: string;

  @IsOptional()
  @IsString()
  public readonly name?: string;
}
