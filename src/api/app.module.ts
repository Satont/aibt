import { Module } from '@nestjs/common';
import { NotableplayersModule } from './notableplayers/notableplayers.module';
import { MedalsController } from './medals/medals.controller';
import { MedalsModule } from './medals/medals.module';

@Module({
  controllers: [],
  providers: [],
  imports: [NotableplayersModule, MedalsModule]
})
export class AppModule {}
