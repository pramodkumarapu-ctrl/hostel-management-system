import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Allow frontend to call backend
  app.enableCors({
    origin: [
      'http://localhost:3001', // local frontend
      'https://hostel-managemnt-frontend.vercel.app', // Vercel frontend
    ],
    credentials: true,
  });

  // ✅ Use cloud port when deployed
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
