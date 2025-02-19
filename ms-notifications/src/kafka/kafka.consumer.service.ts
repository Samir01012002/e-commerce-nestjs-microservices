import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Event } from './event/event';
import { OrderCreatedEvent } from './event/orders/order-created-event';
import { OrderEventHandler } from './handler/order.event.handler';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { envs } from 'src/config';

@Injectable()
export class KafkaConsumerService {
  private readonly kafka = new Kafka({
    brokers: [envs.kafkaBrokerAddress],
  });

  private readonly consumer: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'my-group' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumer.push(consumer);
  }

  async onApplicationShutdown() {
    await Promise.all(this.consumer.map((consumer) => consumer.disconnect()));
  }
}
