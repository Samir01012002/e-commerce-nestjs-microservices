import { IsEnum, IsString, IsUUID } from 'class-validator';
import { OrderStatusEnum } from '../enum/order.enum';

export class ChangeOrderStatusDto {
  @IsString()
  @IsUUID()
  orderId: string;

  @IsEnum(OrderStatusEnum, {
    message: `status must be one of the following values: ${OrderStatusEnum.PENDING}, ${OrderStatusEnum.IN_PROCESS}, ${OrderStatusEnum.COMPLETED}`,
  })
  @IsString()
  status: OrderStatusEnum = OrderStatusEnum.PENDING;
}
