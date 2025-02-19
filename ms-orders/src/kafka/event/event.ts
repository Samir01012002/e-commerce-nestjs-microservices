import { EventType } from './event.type';

export class Event<T> {
  eventType: EventType;
  body: T;
}
