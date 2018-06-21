import { NestFactory } from '@nestjs/core';
import { JSSDKModule } from './jssdk/';

async function bootstrap() {
  const app = await NestFactory.create(JSSDKModule);
  await app.listen(3000);
}
bootstrap();
