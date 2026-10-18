import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BooksService } from '@/app/books/application/books.service';
import { UsersService } from '@/app/users/application/users.service';
import { BorrowRepository, type IBorrowRepository } from '../domain/borrow.repository';
import { BorrowEntity, CreateBorrowInput } from '../domain/borrow.entity';
import { type IUnitOfWorkRepository, unitOfWorkRepository } from '@/common/unit-of-work/domain/unit-of-work.repository';
import { MailSenderPort } from '@/libs/infra/mail/domain/mail-sender-port';
import { MailService } from '@/libs/infra/mail/application/mail.service';
import { MailAddres } from '@/libs/infra/mail/domain/value-object/mail-adress.vo';

@Injectable()
export class BorrowService {
 
  constructor(
    @Inject(BorrowRepository)
    private borrowService: IBorrowRepository,
    @Inject(unitOfWorkRepository)
    private unitOfWork: IUnitOfWorkRepository,
    private mailService: MailService,
    private userService: UsersService,
    private bookService: BooksService,
    
  ) {}

  async toBorrow(dto: CreateBorrowInput): Promise<{borrow: BorrowEntity}> {
    const [user, book] = await Promise.all([
      this.userService.getUserById(dto.userId),
      this.bookService.getBookById(dto.bookId),
    ]); 

    book.book.hasInInventory();
       
    const borrow = BorrowEntity.create(dto);

    await this.unitOfWork.transaction(async ()=>{
      await this.borrowService.create(borrow);  
      await this.bookService.saveBook(book.book)
    }) 
    
    return {borrow}

  } 
  
  
  async toReturn(borrowId: string): Promise<{borrow: BorrowEntity}>{
    const borrow = await this.borrowService.findById(borrowId);

    if(!borrow){
      throw new NotFoundException('Borrow was not found')
    }
  
    const {book} = await this.bookService.getBookById(borrow.bookId);
    borrow.returnBook();
    book.backToInventory();

    await this.unitOfWork.transaction(async ()=>{
      //save borrow
      await this.borrowService.saveBorrow(borrow);
      //save book
      await this.bookService.saveBook(book);
    })
    
    return {borrow}
  }

  async getAllBorrow(): Promise<{borrow: BorrowEntity[] | null}>{
    const borrow = await this.borrowService.findAll();
    return {borrow}
  }

  async deadLineExpired(){  
    const borrows = await this.borrowService.findAll();

    if(!borrows){
      throw new NotFoundException("there aren't borrows registered")
    }

    //get better (Bulk update direto no banco)-(paginação/streaming em lotes offset)-(cursor/keyset pagination)-(fila BULLMQ)
    for (const borrow of borrows){
      borrow.isOverDue();
      await this.borrowService.saveBorrow(borrow)
    }
  }

  public async warningDataExpired(){
      const borrows = await this.borrowService.findAll();

      if(!borrows){
        throw new NotFoundException("there aren't borrows registered")
      }

      const subject = "Alert! deadline borrow"
      const body = "your borrow end in up to 3 days"

      // to reduce loop event
      for(const borrow of borrows){
        if(borrow.isTooCloseExpiredTime()){
          const {user} = await this.userService.getUserById(borrow.userId);
          const to = new MailAddres(user.email);
          this.mailService.execute(to, subject, body)
        }
      }
  }

}
