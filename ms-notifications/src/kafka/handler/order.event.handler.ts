import { Injectable } from '@nestjs/common';
import { Event } from '../event/event';
import { OrderCreatedEvent } from '../event/orders/order-created-event';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrderEventHandler {
  constructor(private readonly mailService: MailService) {}

  async handleOrderCreatedEvent(event: Event<OrderCreatedEvent>) {
    await this.mailService.sendMail(
      event.body.email,
      'Su orden ha sido creada',
      `Orden con id ${event.body.orderId} ha sido creada`,
      `<h1>¡Buenas noticias!</h1> <br> <p> Su orden con id ${event.body.orderId} ha sido creada.</p>`,
    );
  }
}
