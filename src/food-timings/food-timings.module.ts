import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { HostelTimingService } from './food-timings.service';
import { HostelTimingController } from './food-timings.controller';

@Module({
  controllers: [HostelTimingController],
  providers: [HostelTimingService, PrismaService],
  exports: [HostelTimingService],
})
export class HostelTimingModule {}
