import { Inject, Injectable } from '@nestjs/common';

const debug = require('debug')('wxauth:wechat');

import { WeChatService } from '../wechat/service';

export interface SDKTicket {
  ticket: string;
  expiresIn: number;
}

const WECHAT_APP_ID = 'WECHAT_APP_ID';
const WECHAT_SECRET = 'WECHAT_SECRET';

@Injectable()
export class JSSDKService extends WeChatService {
  private ticket: string = null;
  private ticketExpires: number = 0;

  constructor(
    @Inject(WECHAT_APP_ID) appId: string,
    @Inject(WECHAT_SECRET) secret: string,
  ) {
    super(appId, secret);
  }

  async getSDKTicket(): Promise<SDKTicket> {
    if (!this.accessToken) await this.getAccessToken();

    if (this.ticket)
      return Promise.resolve({
        ticket: this.ticket,
        expiresIn: this.ticketExpires,
      });
    return this.wechatService
      .get('/cgi-bin/token', {
        params: {
          access_token: this.accessToken,
          type: 'jsapi',
        },
      })
      .then(({ data }) => {
        debug('>>> fetch ticket success');
        return <SDKTicket>data;
      })
      .catch(err => debug('>>> fail fetch ticket: ', err));
  }
}
