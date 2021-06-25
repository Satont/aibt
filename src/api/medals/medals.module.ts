import { Module } from '@nestjs/common';
import { MedalsController } from './medals.controller';

@Module({
  controllers: [MedalsController]
})
export class MedalsModule {}
