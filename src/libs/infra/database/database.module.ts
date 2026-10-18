import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersOrmEntity } from '@/app/users/infrastructure/database/typeorm/entitites/user-typeorm.entity';
import { BooksOrmEntity } from '@/app/books/infrastructure/database/typeorm/entities/book.entity';
import { BorrowOrmEntity } from '@/app/borrow/infrastructure/database/typeorm/entities/borrow.entity';
import { join } from 'path';
import { ConfigurationModule } from '@/libs/configuration/configuration.module';


@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            useFactory: (config: ConfigService)=>(
                {
                type: 'postgres',
                host: config.getOrThrow<string>('DATABASE_HOST'),
                port: config.getOrThrow<number>('DATABASE_PORT'),
                username: config.getOrThrow<string>('DATABASE_USER'),
                password: config.getOrThrow<string>('DATABASE_PASSWORD'),
                database:  config.getOrThrow<string>('DATABASE_NAME'),
                entities: [UsersOrmEntity, BooksOrmEntity, BorrowOrmEntity],
                migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
                synchronize: false,
                autoLoadEntities: true,
                logging: ['error'],
             
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule {}
