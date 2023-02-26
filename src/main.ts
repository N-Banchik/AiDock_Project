import { AppConfig } from './Configuration/app.config';

async function bootstrap() {
  const app = new AppConfig().startupConfig();
}
bootstrap();
