import { IsOptional, Matches } from 'class-validator';

export class MenuParamsDto {
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/)
  public readonly id?: string;
}
