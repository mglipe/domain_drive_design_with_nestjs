import { EntityManager, Repository } from "typeorm";
import { IUserRepository } from "../domain/user.repository";
import { UsersOrmEntity } from "./database/typeorm/entitites/user-typeorm.entity";
import {  UserEntity } from "../domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Matricula } from "../domain/value-object/matricula.vo";
import { TransactionContext } from "@/common/unit-of-work/unit-of-work.context";
import { CPF } from "../domain/value-object/cpf.vo";

export class TypeormUserRepository implements IUserRepository{
   
    constructor(
        @InjectRepository(UsersOrmEntity)
        private repository: Repository<UsersOrmEntity>
    ){}

    private get manager(): EntityManager{
        return TransactionContext.getManager() ?? this.repository.manager
    }

    async findAll(){
        const users = await this.manager.find(UsersOrmEntity);
        if(!users.length) return null
        return users.map((u)=> this.mapToUserEntity(u))    
    }

    async findById(id: string) {
        const user = await this.manager.findOneBy(UsersOrmEntity, {id})
        return user ? this.mapToUserEntity(user) : null 
    }

    async findByEmail(email: string){
        const user = await this.manager.findOneBy(UsersOrmEntity, {email})
        return user ? this.mapToUserEntity(user) : null
        
    }

     async findByCPF(cpf: CPF){
        const user = await this.manager.findOneBy(UsersOrmEntity, {cpf: cpf.toString()})
        return user ? this.mapToUserEntity(user) : null
        
    }

    async existMatricula(matricula: string){
        return await this.manager.exists(UsersOrmEntity,{where:{matricula}})
       
    }

    async createUser(inputUser: UserEntity){
        const user = this.mapToPersistence(inputUser);
        await this.manager.save(UsersOrmEntity, user)
    }

    async updateUser(id: string, inputUser: UserEntity){
        const user = this.mapToPersistence(inputUser)
        await this.manager.update(UsersOrmEntity, id, user) 
    }

    
    private mapToUserEntity(userInDb?:UsersOrmEntity){
        if(!userInDb){
            return null
        }
        return UserEntity.fromProps({
            id: userInDb?.id,
            firstname: userInDb?.firstname,
            email: userInDb?.email,
            cpf: new CPF(userInDb?.cpf),
            matricula: new Matricula(userInDb?.matricula),
            create_at: userInDb?.create_at,
            update_at: userInDb?.update_at
        })
    }

    private mapToPersistence(userInDomain: UserEntity):Partial<UsersOrmEntity>{
        return {
            id: userInDomain.id,
            firstname: userInDomain.firstname,
            email: userInDomain.email,
            cpf: userInDomain.cpf.toString(),
            matricula: userInDomain.matricula.getValue(),
            create_at: userInDomain.create_at,
            update_at: userInDomain.update_at
        }
    }
}