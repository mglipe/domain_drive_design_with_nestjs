import { ValidatorOptions } from 'class-validator';
//this interface was created because I can customize the validation-pipe
export interface ValidationPipeOptions extends ValidatorOptions {
  transform: boolean;
}
