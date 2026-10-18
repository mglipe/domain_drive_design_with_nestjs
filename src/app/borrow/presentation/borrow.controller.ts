import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BorrowService } from '../application/borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('borrow')
export class BorrowController {
 
  constructor(private borrowService: BorrowService) {}

  @Post('/create')
  async createBorrow(@Body() dto: CreateBorrowDto) {
    try{
      const {borrow} =await this.borrowService.toBorrow(dto);
      return borrow;
    }catch(error){
      throw error
    }
  } 

  @Post('/return/:id')
  async backBorrow(@Param('id') id: string){
    try{
      const {borrow} = await this.borrowService.toReturn(id);
      return borrow
    }catch(error){
      if(error instanceof Error && error.cause === 'INVALID_BORROW_STATUS'){
        throw new BadRequestException(error.message)
      }
      throw error
    }
  }

  @Get()
  async getBorrow(){
    try{
      const {borrow} = await this.borrowService.getAllBorrow();
      return borrow
    }catch(error){
      throw error
    }
  }
     
}
