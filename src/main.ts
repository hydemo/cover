import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';
import { ValidationPipe } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { EventModule } from './events/event.module';
import { UserModule } from './users/user.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, skipMissingProperties: true }));
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const ApiOptions = new DocumentBuilder()
    .setTitle('井盖API文档')
    .setDescription('井盖API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .build();

  const ApiDocument = SwaggerModule.createDocument(app, ApiOptions, {
    include: [
      CoverModule,
      DeviceModule,
      DataModule,
      WellModule,
      EventModule,
      UserModule,
      MaintenanceModule,
      AuthModule,
    ],
  });
  SwaggerModule.setup('v1/api', app, ApiDocument);

  await app.listen(8001);

}
bootstrap();