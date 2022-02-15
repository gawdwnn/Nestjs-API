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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderListener } from 'src/order/listeners/order.listener';

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
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['pkc-6ojv2.us-west4.gcp.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: 'NX3IUMAGQ4MNIPHO',
              password:
                '6xAnJb8hMBOjiAdCF/Vve7YKMjffi0v5T2Tnlhh0Vu1YpBJGJh2quOnH2PShJQj8',
            },
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, OrderListener],
})
export class OrderModule {}
