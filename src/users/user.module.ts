import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), // ✅ FIX circular dependency
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
