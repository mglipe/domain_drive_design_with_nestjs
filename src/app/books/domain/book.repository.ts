import { BookEntity, SearchBook } from "./book.entity"

export interface IBookRepository{
    createBook(input: BookEntity): Promise<void>;
    findAll(query: SearchBook):Promise< (BookEntity | null)[] | null | undefined>;
    findById(id: string): Promise<BookEntity | null>;
    findByTile(title: string): Promise<BookEntity | null>
    save(input:BookEntity):Promise<void>
}


export const BookRepository = Symbol.for('BookRepository')