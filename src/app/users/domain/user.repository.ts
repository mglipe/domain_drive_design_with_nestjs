import { UpdateResult } from "typeorm";
import { CreateUserInput, UserEntity } from "./user.entity";
import { CPF } from "./value-object/cpf.vo";


export interface IUserRepository{
  findAll():Promise<(UserEntity | null)[] | null>;
  findById(id: string):Promise<UserEntity | null>;
  findByEmail(email: string):Promise<UserEntity | null>;
  existMatricula(matricula: string):Promise<boolean>;
  createUser(inputUser: CreateUserInput):Promise<void>;
  updateUser(id: string, inputUser: CreateUserInput):Promise<void>;
  findByCPF(cpf: CPF): Promise<UserEntity | null>
}

//this is symbol for token provider
export const UserRepository = Symbol.for('UserRepository');