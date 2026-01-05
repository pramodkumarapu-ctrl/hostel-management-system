import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow frontend to call backend
  app.enableCors({
    origin: [
      'http://localhost:3001', // local frontend
      'https://hostel-managemnt-frontend.vercel.app', // deployed frontend
    ],
    credentials: true,
  });

  // Optional: prefix all routes
  app.setGlobalPrefix('api');

  // Use Render's dynamic port
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend is running on port ${port}`);
}
bootstrap();
