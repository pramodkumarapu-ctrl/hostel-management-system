import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { HostelController } from './hostels.controller';
import { HostelService } from './hostels.service';

@Module({
  controllers: [HostelController],
  providers: [HostelService, PrismaService],
  exports: [HostelService],
})
export class HostelModule {}
