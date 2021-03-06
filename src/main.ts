import { NestFactory } from '@nestjs/core';
import { JSSDKModule } from './jssdk/';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(JSSDKModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
