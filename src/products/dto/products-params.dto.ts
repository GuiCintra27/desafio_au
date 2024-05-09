import { IsMongoId, IsOptional } from 'class-validator';

export class ProductsParamsDto {
  @IsOptional()
  @IsMongoId()
  public readonly id?: string;
}
