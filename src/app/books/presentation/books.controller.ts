import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from '../application/books.service';
import { SearchBookQueryDto } from './dto/search-book-query.dto';

@Controller('books')
export class BooksController {

   constructor(private bookService: BooksService) {}

  @Post('/create')
  async createBook(@Body() books: CreateBookDto) {
    try {
      const { book } = await this.bookService.createBook(books);
      return book;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getBooks(
    @Query() query: SearchBookQueryDto,
  ) {
    try {
      const { books } = await this.bookService.getBooks(query);
      return books;
    } catch (error) {
      throw error;
    }
  } 
   
}
