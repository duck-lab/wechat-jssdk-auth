import { Module } from '@nestjs/common';
import { JSSDKController } from './controller';
import { JSSDKService } from './service';
import { WeChatModule } from '../wechat';

@Module({
  imports: [],
  controllers: [JSSDKController],
  providers: [
    JSSDKService,
    {
      provide: 'WECHAT_APP_ID',
      useValue: 'wx186c10fc6a4ff63c',
    },
    {
      provide: 'WECHAT_SECRET',
      useValue: '741deef4b669efa309c76aebf2b0c9ac',
    },
  ],
})
export class JSSDKModule {}
