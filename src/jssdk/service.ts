import { Inject, Injectable } from '@nestjs/common';

import * as crypto from 'crypto';
import * as debug from 'debug';
import * as dayjs from 'dayjs';
import * as randomString from 'randomstring';
const log = debug('wxauth:jssdk');

import { WeChatService } from '../wechat/service';
import { ConfigService } from '../config/service';

export interface SDKTicket {
  ticket: string;
  expiresIn: number;
}

export interface SDKSign {
  sign: string;
  expiresIn: number;
}

@Injectable()
export class JSSDKService extends WeChatService {
  private ticket: string = null;
  private ticketExpiresTime: dayjs.Dayjs = null;

  constructor(config: ConfigService) {
    super(config.get('WECHAT_APP_ID'), config.get('WECHAT_SECRET'));
  }

  async getSDKTicket(): Promise<SDKTicket> {
    try {
      if (this.ticket && dayjs().isBefore(this.ticketExpiresTime))
        return Promise.resolve({
          ticket: this.ticket,
          expiresIn: this.ticketExpiresTime.diff(dayjs(), 'second'),
        });
      if (!this.accessToken) await this.getAccessToken();

      const { data } = await this.wechatService.get(
        '/cgi-bin/ticket/getticket',
        {
          params: {
            access_token: this.accessToken,
            type: 'jsapi',
          },
        },
      );

      const { errcode, errmsg, ticket, expires_in } = data;
      if (errcode && errcode !== 0) throw new Error(errmsg);
      this.ticket = ticket;
      this.ticketExpiresTime = dayjs().add(
        expires_in - 200 /* Give some spare time before expires */,
        'second',
      );
      log('>>> fetch ticket success');
      return {
        ticket,
        expiresIn: expires_in,
      } as SDKTicket;
    } catch (error) {
      log('>>> fail fetch ticket: ', error);
      throw error;
    }
  }

  async getSDKSign(url: string): Promise<SDKSign> {
    try {
      const { ticket, expiresIn } = await this.getSDKTicket();

      return {
        sign: crypto
          .createHash('sha1')
          .update(
            `jsapi_ticket=${ticket}
            &noncestr=${randomString.generate(16)}
            &timestamp=${Math.floor(Date.now() / 1000)}
            &url=${url}`,
          )
          .digest('hex'),
        expiresIn,
      };
    } catch (error) {
      log('>>> fail generate sign: ', error);
      throw error;
    }
  }
}
