import { Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from './event/orders/order-created-event';
import { Event } from './event/event';
import { KafkaConsumerService } from './kafka.consumer.service';
import { OrderEventHandler } from './handler/order.event.handler';

@Injectable()
export class KafkaListener implements OnModuleInit {
  constructor(
    private readonly kafkaConsumerService: KafkaConsumerService,
    private readonly orderEventHandler: OrderEventHandler,
  ) {}

  async onModuleInit() {
    await this.kafkaConsumerService.consume(
      { topic: 'order-created' },
      {
        eachMessage: async ({ message }) => {
          if (message && message.value) {
            const event = JSON.parse(
              message.value.toString(),
            ) as Event<OrderCreatedEvent>;
            this.orderEventHandler.handleOrderCreatedEvent(event);
          }
        },
      },
    );
  }

  async handleOrderCreatedEvent(event: Event<OrderCreatedEvent>) {
    console.log('Received order:', event);
  }
}
