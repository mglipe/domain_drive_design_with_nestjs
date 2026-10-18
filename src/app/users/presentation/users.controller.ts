import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { type Request, type Response } from 'express';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController { 
  constructor(private usersService: UsersService) {}
  
  @Post('/create')
  @UseFilters(new HttpExceptionFilter())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { user } = await this.usersService.createUser(createUserDto);
      return { user };
    } catch (error) {
      if(error instanceof Error && error.cause === 'EMAIL_ALREADY_EXISTS'){
        throw new BadRequestException(error.message)
      }
      if(error instanceof Error && error.cause === 'INVALID_TYPE'){
        throw new BadRequestException(error.message)
      }
      if(error instanceof Error && error.cause === 'DUPLICATE_REGISTER_CPF'){
        throw new BadRequestException(error.message)
      }
      throw error;
    }
  }

  @Post('/update/:id')
  @UseFilters(new HttpExceptionFilter())
  async updateUser(
    @Param('id') id: string,
    @Body() createUserDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.updateUser(id, {
        firstname: createUserDto.firstname,
      });
      return { message: `${id} was updated` };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    try {
      const { user } = await this.usersService.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  //this is an example of wildcard, it means that route accept anything after slash, like /123, /abc
  @Get('/*splat')
  wildcards(@Param('id') id: string): { id: string } {
    return { id };
  }

  @Get('/')
  @UseFilters(new HttpExceptionFilter())
  async getUsers() {
    try {
      const { users } = await this.usersService.getUsers();
      return {users};
    } catch (error) {
      throw error
    }
  }
    
}
