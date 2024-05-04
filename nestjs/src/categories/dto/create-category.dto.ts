import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ALL', 'DAY', 'NIGHT'])
  day_shift: 'ALL' | 'DAY' | 'NIGHT';
}
