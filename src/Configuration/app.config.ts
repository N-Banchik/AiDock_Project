import { INestApplication, Injectable, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

export class AppConfig {
  private configService: ConfigService;

  async startupConfig(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    this.configService = app.get(ConfigService);
    app.enableCors({ origin: this.configService.get<string>('CORS_ORIGINS') });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/API');
    await app.listen(3000);
    return app;
  }
}
