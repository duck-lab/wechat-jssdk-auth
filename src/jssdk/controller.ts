import { Get, Controller, Query } from '@nestjs/common';
import { JSSDKService, SDKTicket, SDKSign } from './service';

interface SignQuery {
  url: string;
  randomStr: string;
  timeStamp: string;
}

@Controller('jssdk')
export class JSSDKController {
  constructor(private readonly sdkService: JSSDKService) {}

  @Get('ticket')
  getTicket(): Promise<SDKTicket> {
    return this.sdkService.getSDKTicket();
  }

  @Get('sign')
  getSign(@Query() query: SignQuery): Promise<SDKSign> {
    const input = Object.assign({}, query, {
      timeStamp: query.timeStamp && Number(query.timeStamp),
    });
    return this.sdkService.getSDKSign(input);
  }
}
