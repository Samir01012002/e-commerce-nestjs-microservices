import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka.consumer.service';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [envs.kafkaBrokerAddress],
          },
          consumer: {
            groupId: 'my-group',
          },
          run: {
            autoCommit: true,
          },
          subscribe: {
            fromBeginning: true,
          }
        },
      },
    ]),
  ],
  providers: [KafkaConsumerService],
  exports: [ClientsModule, KafkaConsumerService],
})
export class KafkaModule {}