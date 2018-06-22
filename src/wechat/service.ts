import { Injectable } from '@nestjs/common';

import * as debug from 'debug';
import * as dayjs from 'dayjs';
const log = debug('wxauth:wechat');

import Axios from 'axios';

interface AccessToken {
  accessToken: string;
  expiresIn: number;
}

@Injectable()
export class WeChatService {
  protected wechatService = Axios.create({
    baseURL: 'https://api.weixin.qq.com',
    timeout: 6000,
  });
  protected accessToken: string = null;
  protected accessTokenExpiresTime: dayjs.Dayjs = null;

  constructor(protected appId: string, protected secret: string) {}

  getAccessToken(): Promise<AccessToken | void> {
    if (this.accessToken && dayjs().isBefore(this.accessTokenExpiresTime))
      return Promise.resolve({
        accessToken: this.accessToken,
        expiresIn: this.accessTokenExpiresTime.diff(dayjs(), 'second'),
      });
    return this.wechatService
      .get('/cgi-bin/token', {
        params: {
          grant_type: 'client_credential',
          appid: this.appId,
          secret: this.secret,
        },
      })
      .then(({ data }) => {
        const { errcode, errmsg, access_token, expires_in } = data;
        if (errcode && errcode !== 0) throw new Error(errmsg);
        this.accessToken = access_token;
        this.accessTokenExpiresTime = dayjs().add(
          expires_in - 200 /* Give some spare time before expires */,
          'second',
        );
        log('>>> fetch accesstoken success');
        return {
          accessToken: access_token,
          expiresIn: expires_in,
        } as AccessToken;
      })
      .catch(err => log('>>> fail fetch access token: ', err));
  }
}
