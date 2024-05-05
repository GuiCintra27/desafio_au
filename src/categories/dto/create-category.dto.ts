import { IsIn, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['ALL', 'DAY', 'NIGHT'])
  day_shift: 'ALL' | 'DAY' | 'NIGHT';
}
