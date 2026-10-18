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
        DATABASE_HOST: process.env['DATABASE_HOST'],
        DATABASE_PORT: process.env['DATABASE_PORT'],
        DATABASE_NAME: process.env['DATABASE_NAME'],
        DATABASE_USER: process.env['DATABASE_USER'],
        DATABASE_PASSWORD: process.env['DATABASE_PASSWORD']
    })
)




export type DatabaseConfig = z.infer<typeof databaseConfigSchema>