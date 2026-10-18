import { Module } from '@nestjs/common';
import databaseConfig from './database.config';
import { ConfigModule } from '@nestjs/config';

const enviroment = process.env.NODE_ENV ?? 'production'
@Module({
    imports:[
        //to manager configs of application
        // main config of module rather than forFeature is more specific
        ConfigModule.forRoot({
            isGlobal: true, // don't need import this module anywhere
            load: [databaseConfig], //load informations defined in this file
            envFilePath: [`.env.${enviroment}`, '.env'],
            
        })
    ]
})
export class ConfigurationModule {}
