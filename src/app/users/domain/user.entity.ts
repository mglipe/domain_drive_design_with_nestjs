import { randomUUID, UUID } from "crypto";
import { Matricula } from "./value-object/matricula.vo";
import { CPF } from "./value-object/cpf.vo";

//NOTE to remove generation Date of database, generate by code
export interface CreateUserInput {
  firstname: string;
  email: string;
  cpf: CPF;
}

export interface UpdateUserInput {
  firstname: string;
}

export interface UserProps extends CreateUserInput{
  id: string;
  matricula: Matricula
  create_at: Date
  update_at: Date
}

export class UserEntity{
  private constructor(
    public readonly id: UUID,
    public firstname: string,
    public readonly email: string,
    //value object
    public readonly cpf: CPF,
    public readonly matricula: Matricula,
    public readonly create_at: Date,
    public readonly update_at?: Date
  ){}


  public static create(input: CreateUserInput, matricula: Matricula): UserEntity{
    return new UserEntity(
      randomUUID(),
      input.firstname,
      input.email,
      new CPF(input.cpf.toString()),
      matricula,
      new Date()
    )
    
  }

  public static fromProps(props: UserProps): UserEntity{
      return new UserEntity(
        props.id as UUID,
        props.firstname,
        props.email,
        props.cpf,
        props.matricula,
        props.create_at,
        props.update_at
      )
  }

  public update(input: UpdateUserInput): UserEntity{
      return new UserEntity(
        this.id as UUID,
        input.firstname,
        this.email,
        this.cpf,
        this.matricula,
        this.create_at,
        new Date()

      )
  }

  public emailExist(email: string): void{
    if(this.email === email){
      throw new Error('Email already exists', {cause: 'EMAIL_ALREADY_EXISTS'})
    }
  }

  public cpfExist(cpf: CPF){
        if(this.cpf.toString() === cpf.toString()){
            throw new Error('CPF already registered', {cause: "DUPLICATE_REGISTER_CPF"})
        }
    }
}