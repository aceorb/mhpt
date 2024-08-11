import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Enable CORS for the development
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CSAS API Documentation')
    .setDescription('Censor Statistic Analyze System Open API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);


  await app.listen(9000);
}
bootstrap();
