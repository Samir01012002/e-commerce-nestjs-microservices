import { OrderStatus } from '@prisma/client';
import {
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';

export class ChangeOrderStatusDto {
  @IsString()
  @IsUUID()
  orderId: string;

  @IsEnum(OrderStatusList, {
    message: `status must be one of the following values: ${OrderStatusList.join(
      ', ',
    )}`,
  })
  @IsString()
  status: OrderStatus = OrderStatus.PENDING;
}
