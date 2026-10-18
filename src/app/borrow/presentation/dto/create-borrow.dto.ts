import { IsUUID } from "class-validator";

export class CreateBorrowDto {
    @IsUUID()
    userId!: string;

    @IsUUID()
    bookId!: string;
}
