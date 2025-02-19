import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @EventPattern('orders')
  handleOrder(data: any) {
    console.log('Received order:', data);
    // Aquí puedes procesar el pedido recibido
  }
}
