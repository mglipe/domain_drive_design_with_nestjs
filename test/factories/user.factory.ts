import { UsersOrmEntity } from "../../src/app/users/infrastructure/database/typeorm/entitites/user-typeorm.entity";
//import {faker} from '@faker-js/faker'

export function makeUser(override: Partial<UsersOrmEntity> = {}){
    return {
        firstname: 'faker.person.firstName',
        email:'faker.internet.email@email.com',
        cpf: '077.281.122.99',
        ...override
    }
}