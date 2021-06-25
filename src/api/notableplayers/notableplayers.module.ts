import { Module } from '@nestjs/common';
import { NotableplayersController } from './notableplayers.controller';

@Module({
  controllers: [NotableplayersController]
})
export class NotableplayersModule {}
