import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BedController } from './beds.controller';
import { BedService } from './beds.service';

@Module({
  controllers: [BedController],
  providers: [BedService, PrismaService],
})
export class BedModule {}
