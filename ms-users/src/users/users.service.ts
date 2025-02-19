import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { envs } from 'src/config';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await this.passwordHash(createUserDto.password),
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  private async passwordHash(password: string) {
    return await bcrypt.hash(password, envs.hash_salt);
  }
}
