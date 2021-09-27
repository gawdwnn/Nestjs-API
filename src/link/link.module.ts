import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { LinkController } from './link.controller';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), SharedModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
