import { Component } from '@nestjs/common';

const debug = require('debug')('wxauth:wechat');
import Axios from 'axios';

interface AccessToken {
  accessToken: string;
  expiresIn: number;
}

@Component()
export class WeChatService {
  protected wechatService = Axios.create({
    baseURL: 'https://api.weixin.qq.com',
    timeout: 1000,
  });
  protected accessToken: string = null;
  protected accessTokenExpires: number = 0;

  constructor(protected appId: string, protected secret: string) {}

  getAccessToken(): Promise<AccessToken | void> {
    if (this.accessToken)
      return Promise.resolve({
        accessToken: this.accessToken,
        expiresIn: this.accessTokenExpires,
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
        debug('>>> fetch accesstoken success');
        return <AccessToken>{
          accessToken: data.access_token,
          expiresIn: data.expires_in,
        };
      })
      .catch(err => debug('>>> fail fetch access token: ', err));
  }
}
