import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class MenuParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly id?: number;
}
