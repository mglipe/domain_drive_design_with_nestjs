import { Inject, Injectable } from "@nestjs/common";
import { type IUserRepository, UserRepository } from "../user.repository";
import { Matricula } from "../value-object/matricula.vo";

@Injectable()
export class MatriculaService{
    constructor(
        @Inject(UserRepository)
        private userRpository: IUserRepository,
    ){}

    async generate(): Promise<Matricula>{
        let matricula: Matricula
        let exist: boolean

        do{
            matricula = Matricula.generate();
            exist = await this.userRpository.existMatricula(matricula.getValue())
        }while(exist)

        return matricula;
    }

}