import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  findOneByEmail(@Payload('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  findOneById(@Payload('id') id: string) {
    return this.usersService.findOneById(id);
  }
}
