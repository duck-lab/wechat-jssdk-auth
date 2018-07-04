import { Module } from '@nestjs/common';
import { JSSDKController } from './controller';
import { JSSDKService } from './service';
import { ConfigModule } from '../config';

@Module({
  imports: [ConfigModule],
  controllers: [JSSDKController],
  providers: [JSSDKService],
})
export class JSSDKModule {}
