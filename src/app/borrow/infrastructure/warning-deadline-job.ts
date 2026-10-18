import { Injectable } from "@nestjs/common";
import { BorrowService } from "../application/borrow.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class WarningDeadlineJob{
    constructor (private borrowService: BorrowService){}


    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handle(){
        console.log('running cron job wraning')
        await this.borrowService.warningDataExpired();
    }

}