import { DataSource } from "typeorm";
import { INestApplication } from "@nestjs/common";
import retry from 'async-retry'
const URL = 'http://localhost:3000'



async function waitingForAllService(){
   await waitngForWebService();
    
    async function waitngForWebService(){
         retry(fetchStatusPage, {
                retries: 100,
                maxTimeout: 1000
            })

        async function fetchStatusPage(){
            const response = await fetch(`${URL}/status`)
           
            if(response.status !== 200){
                throw new Error('')
            }
        }
    }
}

async function cleanDataBase(app: INestApplication){
    const dataSource = app.get(DataSource)
    await dataSource.query('DROP schema public CASCADE; CREATE schema IF NOT EXISTS public;')
} 

async function pendingRunMigrations(app: INestApplication){
    const dataSource = app.get(DataSource)
    await dataSource.runMigrations();
}


export default{
    waitingForAllService,
    pendingRunMigrations,
    cleanDataBase
}