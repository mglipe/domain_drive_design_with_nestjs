import { addDays, subDays } from "date-fns";
import { fileURLToPath, pathToFileURL } from "url";
console.log('running test')
import path from "path";
const date = new Date();

const later = 2

const dueDate = addDays(date, later)

import { DataSource } from "typeorm";
import dotenv from 'dotenv' 

dotenv.config();

const dataSource =  new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:
        process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE_NAME,
    entities: ['src/app/infrastrucute/**/*.entity{.ts,.js}'],
    migrations: ['src/libs/database/migrations/*{.ts,.js}'],
    synchronize: false,
})



console.log(dataSource)
