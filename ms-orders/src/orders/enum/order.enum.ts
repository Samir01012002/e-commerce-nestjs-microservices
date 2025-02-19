import { OrderStatus } from '@prisma/client';

export const OrderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.IN_PROCESS,
  OrderStatus.COMPLETED,
];
