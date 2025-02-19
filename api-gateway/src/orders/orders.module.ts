import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { ORDERS_SERVICE } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
      ClientsModule.register([
        {
          name: ORDERS_SERVICE,
          transport: Transport.TCP,
          options: {
            host: envs.orders_service_host,
            port: envs.orders_service_port,
          },
        },
      ]),
      AuthModule
    ],
})
export class OrdersModule {}
