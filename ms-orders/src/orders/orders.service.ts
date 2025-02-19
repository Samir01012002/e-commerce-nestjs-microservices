import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { KafkaProducerService } from 'src/kafka/kafka.producer.service';
import { OrderCreatedEvent } from 'src/kafka/event/orders/order-created-event';
import { Event } from 'src/kafka/event/event';
import { EventType } from 'src/kafka/event/event.type';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const createdOrder = await this.prisma.order.create({
      data: {
        product: createOrderDto.product,
        quantity: createOrderDto.quantity,
        total: createOrderDto.total,
        status: createOrderDto.status,
        user: createOrderDto.user.id,
      },
    });

    let event: Event<OrderCreatedEvent> = {
      eventType: EventType.ORDER_CREATRED,
      body: {
        email: createOrderDto.user.email,
        userId: createdOrder.user,
        orderId: createdOrder.id,
      },
    };
    await this.kafkaProducerService.sendMessage('order-created', event);

    return createdOrder;
  }

  async findByUserId(user: string) {
    return await this.prisma.order.findMany({
      where: {
        user,
      },
    });
  }

  async changeOrderStatus(changeOrderStatus: ChangeOrderStatusDto) {
    return await this.prisma.order.update({
      where: {
        id: changeOrderStatus.orderId,
      },
      data: {
        status: changeOrderStatus.status,
      },
    });
  }
}
