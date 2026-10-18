import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository, type IBookRepository } from '../domain/book.repository';
import { BookEntity, CreateBookInput, SearchBook } from '../domain/book.entity';

@Injectable()
export class BooksService {
 
   constructor(
    @Inject(BookRepository)
    private bookRepository: IBookRepository,
  ) {}

  async createBook(dto: CreateBookInput): Promise<{book: BookEntity}> {
   const instanceBook = BookEntity.create(dto);
    const titleAlreadyExist = await this.bookRepository.findByTile(instanceBook.title);

    if (titleAlreadyExist) {
      throw new ConflictException('Title já registrado');
    }

    await this.bookRepository.createBook(instanceBook);

    return { book: instanceBook }; 
  }

  async saveBook(dto: BookEntity):Promise<void>{
    await this.bookRepository.save(dto);
  }

  async getBooks(query: SearchBook): Promise<{books:(BookEntity| null)[] | null | undefined}> {
    const books = await this.bookRepository.findAll(query);

    if(!books){
      throw new NotFoundException('Book was not found')
    }
    return { books };
  }

  async getBookById(bookId: string): Promise<{book: BookEntity}> {
    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new NotFoundException('book not found');
    }

    return { book };
  } 


   
}
