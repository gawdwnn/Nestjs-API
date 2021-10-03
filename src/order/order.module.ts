import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from '../link/link.module';
import { ProductModule } from '../product/product.module';
import { SharedModule } from '../shared/shared.module';
import { OrderItem } from './order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    SharedModule,
    LinkModule,
    ProductModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'docker.for.mac.localhost',
        port: 1025,
      },
      defaults: {
        from: 'no-reply@example.com',
      },
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
})
export class OrderModule {}
