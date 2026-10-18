import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { creatingTestApp } from '../../utils/test-app.factory'
import orchestration from '../../utils/orchestration'
import { UsersService } from '@/app/users/application/users.service'


describe('', ()=>{
    let app: INestApplication
    let userSerive: UsersService
    
    beforeAll(async ()=>{
        app = await creatingTestApp();
        await orchestration.cleanDataBase(app);
        await orchestration.pendingRunMigrations(app)
        userSerive = app.get(UsersService)
    })

    it('Post user', ()=>{
       return request(app.getHttpServer())
        .post('/users/create')
        .send({
            firstname: "Marcelo Garcia",
            email:"marcelogarcia000@gmail.com",
            cpf: "077.497.293-99"
        })
        .set('Accept', 'application/json')
        .expect(201)    
    })


    afterAll(async ()=>{
        await app.close()
    })
})