import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Kafka } from '@nestjs/microservices/external/kafka.interface';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
