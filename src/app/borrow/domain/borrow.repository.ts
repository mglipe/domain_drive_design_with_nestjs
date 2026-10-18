import { BorrowEntity } from "./borrow.entity"

export interface IBorrowRepository{
    create(input: BorrowEntity):Promise<void>
    findAll():Promise<BorrowEntity[] | null>
    findById(borrowId: string): Promise<BorrowEntity | null>
    saveBorrow(borrow: BorrowEntity): Promise<void>
}



export const BorrowRepository = Symbol.for('BorrowRepository')
