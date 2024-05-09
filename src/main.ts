import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT || 3000;

  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
    }),
  );

  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${PORT}`);
}
bootstrap();
