import { Controller, Get, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MigrationExecutor } from 'typeorm/browser';

@Controller('migrations')
export class MigrationsController {

    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ){}
    @Get('/')
     async getMigrations(){
        const executor =  new MigrationExecutor(this.dataSource);
        const migrationsPending = await executor.getPendingMigrations();
        return migrationsPending
    }


    @Post('/run')
    async postMigrations(){
        try{
            const executor = new MigrationExecutor(this.dataSource);
            await this.dataSource.runMigrations()
            const migrationsExecuted = await executor.getExecutedMigrations();
            return migrationsExecuted;
        }catch(err){
            console.log(err)
        }
    }
}
