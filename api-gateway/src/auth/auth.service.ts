import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { USERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { RequestCustom } from './interfaces/requestCustom.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const user: User = await firstValueFrom(
      this.getUserByEmail(registerAuthDto.email),
    );

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const userCreated: User = await firstValueFrom(
      this.usersClient.send({ cmd: 'create_user' }, registerAuthDto),
    );

    return {
      token: await this.jwtService.signAsync({
        email: userCreated.email,
      }),
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user: User = await firstValueFrom(this.getUserByEmail(email));

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const compare = await this.passwordHashCompare(password, user.password);

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: await this.jwtService.signAsync({
        email,
      }),
    };
  }

  async profile(request: RequestCustom) {
    const user = await firstValueFrom(this.getUserByEmail(request.user.email));
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private getUserByEmail(email: string) {
    return this.usersClient.send({ cmd: 'get_user_by_email' }, { email });
  }

  getUserById(id: string) {
    return this.usersClient.send({ cmd: 'get_user_by_id' }, { id });
  }

  private async passwordHashCompare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
