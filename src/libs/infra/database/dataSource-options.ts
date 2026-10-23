import { BooksOrmEntity } from "@/app/books/infrastructure/database/typeorm/entities/book.entity";
import { BorrowOrmEntity } from "@/app/borrow/infrastructure/database/typeorm/entities/borrow.entity";
import { UsersOrmEntity } from "@/app/users/infrastructure/database/typeorm/entitites/user-typeorm.entity";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { DataSourceOptions } from "typeorm";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: new ConfigService().get<string>('POSTGRES_HOST'),
    port: new ConfigService().get<number>('POSTGRES_PORT'),
    username: new ConfigService().get<string>('POSTGRES_USER'),
    password: new ConfigService().get<string>('POSTGRES_PASSWORD'),
    database:  new ConfigService().get<string>('POSTGRES_NAME'),
    entities: [UsersOrmEntity, BooksOrmEntity, BorrowOrmEntity],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: false,
}
