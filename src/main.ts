import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CoverModule } from './covers/cover.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const coverApiOptions = new DocumentBuilder()
    .setTitle('井盖API文档')
    .setDescription('井盖API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();

  const coverApiDocument = SwaggerModule.createDocument(app, coverApiOptions, { include: [CoverModule] });
  SwaggerModule.setup('v1/api', app, coverApiDocument);

  await app.listen(3000);

}
bootstrap();