import { Get, Controller, Query } from '@nestjs/common';
import { JSSDKService, SDKTicket, SDKSign } from './service';

@Controller('jssdk')
export class JSSDKController {
  constructor(private readonly sdkService: JSSDKService) {}

  @Get('ticket')
  getTicket(): Promise<SDKTicket> {
    return this.sdkService.getSDKTicket();
  }

  @Get('sign')
  getSign(@Query('url') url: string): Promise<SDKSign> {
    if (url.includes) throw new Error('Invalid URL, No "#" include.');
    return this.sdkService.getSDKSign(url);
  }
}
