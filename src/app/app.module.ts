import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { ConfigurationModule } from '@/libs/configuration/configuration.module';
import { DatabaseModule } from '@/libs/infra/database/database.module';
import { MailModule } from '@/libs/infra/mail/mail.module';
import { TaskScheduleModule } from '@/libs/infra/task-schedule/task-schedule.module';
import { StatusModule } from '@/common/heathy/status/status.module';
import { MigrationsModule } from '@/common/heathy/migrations/migrations.module';


@Module({
  imports: [
    UsersModule,
    BooksModule,
    BorrowModule,
    StatusModule,
    MigrationsModule,
    ConfigurationModule,
    DatabaseModule,
    MailModule,
    TaskScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
