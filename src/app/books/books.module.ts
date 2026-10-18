import { Module } from '@nestjs/common';
import { BooksService } from './application/books.service';
import { BooksController } from './presentation/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksOrmEntity } from './infrastructure/database/typeorm/entities/book.entity';
import { TypeormBookRepository } from './infrastructure/typeorm.repository';
import { BookRepository } from './domain/book.repository';


@Module({
  imports: [TypeOrmModule.forFeature([BooksOrmEntity])],
  exports: [BooksService],
  providers: [BooksService, 
    {
      provide: BookRepository,
      useClass: TypeormBookRepository
    }
  ],
  controllers: [BooksController],
})
export class BooksModule {}
