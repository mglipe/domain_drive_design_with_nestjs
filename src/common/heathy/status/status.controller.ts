import dataSource from '@/libs/infra/database/dataSource.cli';
import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('status')
export class StatusController {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ){}

    @Get('/')
    public async status(){
        const queryRunner = this.dataSource.createQueryRunner()
        const connection_activity = await queryRunner.query(`SELECT count(*) FROM pg_stat_activity`)
        const max_connection = await queryRunner.query('SHOW max_connections')

      
        return {
            connection_activity: connection_activity[0].count,
            max_connection: max_connection[0].max_connections
           
        };
    }
}
