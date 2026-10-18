import {  IsNotEmpty, IsOptional, MaxLength } from 'class-validator';


export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  firstname!: string;
}
