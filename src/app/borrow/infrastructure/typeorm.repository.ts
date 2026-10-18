import { InjectRepository } from "@nestjs/typeorm";
import { IBorrowRepository } from "../domain/borrow.repository";
import { BorrowOrmEntity } from "./database/typeorm/entities/borrow.entity";
import { EntityManager, Repository } from "typeorm";
import { BorrowEntity, BorrowStatus } from "../domain/borrow.entity";
import { UsersOrmEntity } from "@/app/users/infrastructure/database/typeorm/entitites/user-typeorm.entity";
import { BooksOrmEntity } from "@/app/books/infrastructure/database/typeorm/entities/book.entity";
import { TransactionContext } from "@/common/unit-of-work/unit-of-work.context";


export class TypeormBorrowRepository implements IBorrowRepository{
    constructor(
        @InjectRepository(BorrowOrmEntity)
        private repository: Repository<BorrowOrmEntity>
    ){}

    private get manager(): EntityManager{
        return TransactionContext.getManager() ?? this.repository.manager
    }

    async create(input: BorrowEntity) {
        const borrow = this.mapToPersistence(input);
        await this.manager.save(BorrowOrmEntity, borrow); 
    }

    async findAll(){
        const borrow = await this.manager.find(BorrowOrmEntity);
        if(!borrow.length) return null;
        return borrow.map((b) => this.mapToEntity(b))
    }

    async findById(borrowId: string){
        const borrow = await this.manager.findOneBy(BorrowOrmEntity, {id: borrowId});
        return borrow ? this.mapToEntity(borrow) : null
    }

    async saveBorrow(input: BorrowEntity){
        const borrow = this.mapToPersistence(input);
        await this.repository.save(borrow);
    }
    

    private mapToEntity(bookInDb: BorrowOrmEntity): BorrowEntity{
        return BorrowEntity.fromProps({
            id: bookInDb.id,
            userId: bookInDb.user.id,
            bookId: bookInDb.book.id,
            borrowed_at: bookInDb.borrowed_at,
            dueDate: bookInDb.dueDate,
            returned_at: bookInDb.returned_at,
            status: bookInDb.status as BorrowStatus
        })
    }

    private mapToPersistence(borrowInDomain: BorrowEntity): Partial<BorrowOrmEntity>{
        return{
            id: borrowInDomain.id,
            user: {id: borrowInDomain.userId} as UsersOrmEntity,
            book: {id: borrowInDomain.bookId} as BooksOrmEntity,
            borrowed_at: borrowInDomain.borrowed_at,
            dueDate: borrowInDomain.dueDate,
            returned_at: borrowInDomain.returned_at,
            status: borrowInDomain.status

        }
    }
}