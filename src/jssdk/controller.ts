import { Get, Controller } from '@nestjs/common';
import { JSSDKService, SDKTicket } from './service';

@Controller('jssdk')
export class JSSDKController {
  constructor(private readonly sdkService: JSSDKService) {}

  @Get('ticket')
  getTicket(): Promise<SDKTicket> {
    return this.sdkService.getSDKTicket();
  }
}
