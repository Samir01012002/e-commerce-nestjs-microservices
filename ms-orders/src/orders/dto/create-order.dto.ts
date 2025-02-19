import { OrderStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';
import { UserDto } from './user.dto';

export class CreateOrderDto {
  @IsString()
  @MinLength(3)
  product: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(1)
  total: number;

  @IsEnum(OrderStatusList, {
    message: `status must be one of the following values: ${OrderStatusList.join(
      ', ',
    )}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsNotEmpty()
  user: UserDto;
}
