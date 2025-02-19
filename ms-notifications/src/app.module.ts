import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { OrderEventHandler } from './kafka/handler/order.event.handler';
import { KafkaListener } from './kafka/kafka.listener';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [KafkaModule, MailModule],
  controllers: [AppController],
  providers: [AppService, KafkaListener, OrderEventHandler],
})
export class AppModule {}
