import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule, // ⬅️ Jwt comes from AppModule (GLOBAL)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
