//use class instead of interface because class are part of the JS (ES6) so they remain intact as real entities in the compiled javascript
// I can use tha class validator to validate the data

import {  IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CPF } from '../../domain/value-object/cpf.vo';


export class CreateUserDto {
  @IsNotEmpty()
  firstname!: string;

  @MaxLength(14, { message: 'valid cpf has 14 charecter' })
  cpf!: CPF;

  @IsEmail()
  email!: string;
}
