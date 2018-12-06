import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  const ApiOptions = new DocumentBuilder()
    .setTitle('井盖API文档')
    .setDescription('井盖API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();

  const ApiDocument = SwaggerModule.createDocument(app, ApiOptions, { include: [CoverModule, WellModule, DeviceModule] });
  SwaggerModule.setup('v1/api', app, ApiDocument);

  await app.listen(8000);

}
bootstrap();