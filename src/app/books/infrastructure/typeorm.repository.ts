import { EntityManager, ILike, Repository } from "typeorm";
import { IBookRepository } from "../domain/book.repository";
import { BooksOrmEntity } from "./database/typeorm/entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity, SearchBook } from "../domain/book.entity";
import { Code } from "../domain/value-object/code.vo";
import { TransactionContext } from "@/common/unit-of-work/unit-of-work.context";

export class TypeormBookRepository implements IBookRepository{
    constructor(
        @InjectRepository(BooksOrmEntity)
        private repository: Repository<BooksOrmEntity>
    ){}

    private get manager(): EntityManager{
        return TransactionContext.getManager() ?? this.repository.manager
    }

    async createBook(input: BookEntity) {
        const book = this.mapToPersisntece(input);
        await this.manager.save(BooksOrmEntity, book);  
    }

    async save(input: BookEntity):Promise<void>{
        const book = this.mapToPersisntece(input);
        await this.manager.save(BooksOrmEntity, book);
    }

    async findAll(query: SearchBook) {
        const books = await this.manager.find(BooksOrmEntity,{
            where: {
                //short-circuiting
                ...(query.title && { title: ILike(`%${query.title}%`) }),
                ...(query.author && { author: ILike(`%${query.author}%`) }),
                }
        })
        if(!books.length) return null
        return books.map((b)=> this.mapToBookEntity(b))
        
    }

    async findById(id: string) {
        const book = await this.manager.findOneBy(BooksOrmEntity,{id})
        return book ? this.mapToBookEntity(book) : null
    }

    async findByTile(title: string){
        const book = await this.manager.findOneBy(BooksOrmEntity,{title})
        return book ? this.mapToBookEntity(book) : null
    }



    private mapToBookEntity(bookInDb: BooksOrmEntity){
        if(!bookInDb){
            return null
        }

        return BookEntity.fromProps({
            id: bookInDb.id,
            title: bookInDb.title,
            author: bookInDb.author,
            inventory: bookInDb.inventory,
            code: new Code(bookInDb.code),
            create_at: bookInDb.create_at,
            update_at: bookInDb.update_at
        })
    }


    private mapToPersisntece(bookInDomain: BookEntity): Partial<BooksOrmEntity>{
        return {
            id: bookInDomain.id,
            title: bookInDomain.title,
            author: bookInDomain.author,
            inventory: bookInDomain.inventory,
            code: bookInDomain.code?.getValue(),
            create_at:bookInDomain.create_at,
            update_at: bookInDomain.update_at

        }
    }
}