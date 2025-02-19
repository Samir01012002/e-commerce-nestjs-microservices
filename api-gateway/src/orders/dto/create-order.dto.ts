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
import { OrderStatusEnum } from '../enum/order.enum';
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

  @IsEnum(OrderStatusEnum, {
    message: `status must be one of the following values: ${OrderStatusEnum.PENDING}, ${OrderStatusEnum.IN_PROCESS}, ${OrderStatusEnum.COMPLETED}`,
  })
  @IsOptional()
  status: OrderStatusEnum = OrderStatusEnum.PENDING;

  @IsNotEmpty()
  user: UserDto;
}
