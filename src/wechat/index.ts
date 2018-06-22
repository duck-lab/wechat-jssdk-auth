import { Module } from '@nestjs/common';
import { WeChatService } from './service';

@Module({
  imports: [],
  controllers: [],
  providers: [WeChatService],
  exports: [WeChatService],
})
export class WeChatModule {}
