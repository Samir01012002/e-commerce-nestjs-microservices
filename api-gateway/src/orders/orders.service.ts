import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await firstValueFrom(
      this.authService.getUserById(createOrderDto.user.id),
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await firstValueFrom(
      this.ordersClient.send({ cmd: 'create_order' }, createOrderDto),
    );
  }

  async getOrderByUser(user: string) {
    return await firstValueFrom(
      this.ordersClient.send({ cmd: 'get_orders_by_user' }, { user }),
    );
  }

  async changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    return await firstValueFrom(
      this.ordersClient.send(
        { cmd: 'change_order_status' },
        changeOrderStatusDto,
      ),
    );
  }
}
