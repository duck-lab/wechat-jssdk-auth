# wechat-jssdk-auth

Simple auth server for wechat jssdk

## Env config

The env config should be save in a `#{NODE_ENV}.env`, if the `NODE_ENV` is `development`, then the file `development.env` will be used to load config.

Example configs in the file

```
WECHAT_APP_ID=xxxxxx
WECHAT_SECRET=xxxxxxxxxxxxxxxx
```

## Start server

```shell
# Dev Dependencies is required to build the code
$ yarn install

# production mode
$ yarn run start

# development
$ npm run start:dev

# watch mode
$ npm run start:hmr
```

## Test

WIP, not complete yet.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
