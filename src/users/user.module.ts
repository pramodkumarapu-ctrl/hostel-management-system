// src/users/users.module.ts
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // move to .env later
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
