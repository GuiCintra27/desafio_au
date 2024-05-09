import { IsMongoId, IsOptional } from 'class-validator';

export class MenuParamsDto {
  @IsOptional()
  @IsMongoId()
  public readonly id?: string;
}
