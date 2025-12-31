import { Module } from '@nestjs/common';
import { ResidentService } from './residents.service';
import { ResidentController } from './residents.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ResidentController],
  providers: [ResidentService, PrismaService],
  exports: [ResidentService],
})
export class ResidentModule {}
