import { randomUUID } from "crypto";
import { addDays, subDays } from "date-fns";

export interface CreateBorrowInput{
    userId: string;
    bookId: string;
}

export interface BorrowProps extends CreateBorrowInput{
    id: string
    borrowed_at: Date;
    returned_at:Date;
    dueDate:Date;
    status: BorrowStatus
}


export enum BorrowStatus {
    ACITVE = 'ACTIVE',
    RETURNED = 'RETURNED',
    OVERDUE = 'OVERDUE'
}

export class BorrowEntity{
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly bookId: string,
        public readonly borrowed_at: Date,
        public dueDate: Date,
        public returned_at: Date  | undefined,
        public status: BorrowStatus
    ){}


    public static create(input:CreateBorrowInput, loanPeriodDays = 14): BorrowEntity{
        const borrow_at = new Date();
        const dueDate = addDays(borrow_at, loanPeriodDays);
        return new BorrowEntity(
            randomUUID(),
            input.userId,
            input.bookId,
            borrow_at,
            dueDate,
            undefined,
            BorrowStatus.ACITVE
        )
    }

    public static fromProps(props: BorrowProps): BorrowEntity{
        return new BorrowEntity(
            props.id,
            props.userId,
            props.bookId,
            props.borrowed_at,
            props.dueDate,
            props.returned_at,
            props.status

        )
    }

    public returnBook(): void{
        if(this.status === BorrowStatus.RETURNED){
            //aways throw an error generics, like this. Because entity dosen't know infrastructure
            throw new Error('this book already returned', {cause: 'INVALID_BORROW_STATUS'})
        }

        this.returned_at = new Date();
        this.status = BorrowStatus.RETURNED
    }

    
    public reniew(extraDays = 7): void{
        if(this.status !== BorrowStatus.ACITVE){
            throw new Error('Borrow is not active')
        }
        this.dueDate = addDays(this.dueDate, extraDays)
    }

    public isOverDue(referenceDate = new Date()): void{
        if(this.status === BorrowStatus.ACITVE && referenceDate > this.dueDate){
            this.status = BorrowStatus.OVERDUE
        }
    }

    public isTooCloseExpiredTime(referenceDate = new Date()): boolean{
        if(this.status !== BorrowStatus.ACITVE){
            throw new Error('Invalid status', {cause: 'INVALID_STATUS_TYPE'})
        }

        //verify logic
        const dateWarning = subDays(this.dueDate, 11);
        console.log("curret date: ",referenceDate)
        console.log("eleven days before: ", dateWarning)
        return  true;
        return referenceDate === dateWarning;
    }




}