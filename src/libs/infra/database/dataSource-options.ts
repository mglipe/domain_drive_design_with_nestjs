import { BooksOrmEntity } from "@/app/books/infrastructure/database/typeorm/entities/book.entity";
import { BorrowOrmEntity } from "@/app/borrow/infrastructure/database/typeorm/entities/borrow.entity";
import { UsersOrmEntity } from "@/app/users/infrastructure/database/typeorm/entitites/user-typeorm.entity";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: new ConfigService().get<string>('DATABASE_HOST'),
    port: new ConfigService().get<number>('DATABASE_PORT'),
    username: new ConfigService().get<string>('DATABASE_USER'),
    password: new ConfigService().get<string>('DATABASE_PASSWORD'),
    database:  new ConfigService().get<string>('DATABASE_NAME'),
    entities: [UsersOrmEntity, BooksOrmEntity, BorrowOrmEntity],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: false,
}
