import { Module } from '@nestjs/common';
import { BorrowService } from './application/borrow.service';
import { BorrowController } from './presentation/borrow.controller';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowOrmEntity } from './infrastructure/database/typeorm/entities/borrow.entity';
import { BorrowRepository } from './domain/borrow.repository';
import { TypeormBorrowRepository } from './infrastructure/typeorm.repository';
import { TypeormUnitOfWorkRepository } from '@/common/unit-of-work/infrastructure/unit-of-work.repository';
import { unitOfWorkRepository } from '@/common/unit-of-work/domain/unit-of-work.repository';
import { ExpiredDeadlineJob } from './infrastructure/expired-deadline-job';
import { MailModule } from '@/libs/infra/mail/mail.module';
import { WarningDeadlineJob } from './infrastructure/warning-deadline-job';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowOrmEntity]), UsersModule, BooksModule, MailModule],
  providers: [
    BorrowService,
    ExpiredDeadlineJob,
    WarningDeadlineJob,
    {
      provide: BorrowRepository,
      useClass: TypeormBorrowRepository
    },
    {
      provide: unitOfWorkRepository,
      useClass: TypeormUnitOfWorkRepository
    }
  ],
  controllers: [BorrowController],
})
export class BorrowModule {}
