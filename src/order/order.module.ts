import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { OrderItem } from './order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), SharedModule],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
})
export class OrderModule {}
