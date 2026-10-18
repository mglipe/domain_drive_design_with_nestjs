import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';

async function bootstrap() {
  //if bodyParser false it mean that Nest won't register bodyParser(JSON and URLENCODED) anymore OBS: Came true by default
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  //app.set('query parser', 'extended')
  app.useGlobalPipes(
    new ValidationPipe({
      //(plaintToInstance of class transform), it means the javascript object It gonna be transformed to DTOS type defined
      transform: true,
      //Defined by DTOs that contains class validator decorators
      whitelist: true,
      //throw an error if property isn't defined in DTOS
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ZodExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
