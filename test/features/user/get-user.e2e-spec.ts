    import { INestApplication } from '@nestjs/common';
    import request from 'supertest'
    import { App } from 'supertest/types';
    import { creatingTestApp } from '../../utils/test-app.factory';
    import orchestration from '../../utils/orchestration';
    import { UsersService } from '@/app/users/application/users.service';

    describe("", ()=>{
        let app: INestApplication<App>;
        let userService: UsersService
        beforeAll(async()=>{
            app = await creatingTestApp();
            await orchestration.waitingForAllService(); 
            await orchestration.cleanDataBase(app)
            await orchestration.pendingRunMigrations(app)
            userService = app.get(UsersService)
        }) 
        
        it("Get users",async ()=>{
        
            for(let i=0; i < 1; i++){
                await request(app.getHttpServer())
                .post('/users/create')
                .send({firstname:'test200', email:'test@gmail.com', cpf:`077-382-129-9${i}`})
                .set('Accept', 'application/json')
                .expect(201)
            
            }
            const expectedUsers =  await userService.getUsers();
        
            const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200)
            
            expect(response.body).toEqual(JSON.parse(JSON.stringify(expectedUsers)))
        
            
        })
        

        afterAll(async ()=>{
            await app.close()
        })
    })