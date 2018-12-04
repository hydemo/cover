import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ApiOptions = new DocumentBuilder()
    .setTitle('井盖API文档')
    .setDescription('井盖API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();

  const ApiDocument = SwaggerModule.createDocument(app, ApiOptions, { include: [CoverModule, WellModule] });
  SwaggerModule.setup('v1/api', app, ApiDocument);

  await app.listen(8000);

}
bootstrap();