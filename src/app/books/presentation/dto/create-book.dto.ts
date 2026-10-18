import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3, { message: 'at least 3 character' })
  title!: string;

  @IsString()
  @MinLength(3, { message: 'at least 3 character' })
  author!: string;

  @IsNumber()
  inventory!: number
}
