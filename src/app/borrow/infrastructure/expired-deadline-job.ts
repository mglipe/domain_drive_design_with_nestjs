import { Cron, CronExpression } from "@nestjs/schedule";
import { BorrowService } from "../application/borrow.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExpiredDeadlineJob{
    constructor(private readonly borrowService: BorrowService ){}

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    async handle(){
        
        await this.borrowService.deadLineExpired()
    }
}