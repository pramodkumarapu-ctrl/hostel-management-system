import { Module } from '@nestjs/common';
import { GateLogsService } from './gate-logs.service';
import { GateLogsController } from './gate-logs.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GateLogsController],
  providers: [GateLogsService, PrismaService],
})
export class GateLogsModule {}
