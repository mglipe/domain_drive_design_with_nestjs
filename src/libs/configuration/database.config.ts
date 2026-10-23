import { registerAs } from '@nestjs/config'
import z from 'zod'


const databaseConfigSchema = z.object({
    //prod would be a url property
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string()
})

export default registerAs('database', ()=> 
    databaseConfigSchema.parse({
        DATABASE_HOST: process.env['POSTGRES_HOST'],
        DATABASE_PORT: process.env['POSTGRES_PORT'],
        DATABASE_NAME: process.env['POSTGRES_NAME'],
        DATABASE_USER: process.env['POSTGRES_USER'],
        DATABASE_PASSWORD: process.env['POSTGRES_PASSWORD']
    })
)




export type DatabaseConfig = z.infer<typeof databaseConfigSchema>