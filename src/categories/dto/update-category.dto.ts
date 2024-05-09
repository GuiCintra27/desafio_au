import { IsMongoId, IsOptional } from 'class-validator';

export class ParamUpdateCategoryDto {
  @IsOptional()
  @IsMongoId()
  public readonly id?: string;
}
