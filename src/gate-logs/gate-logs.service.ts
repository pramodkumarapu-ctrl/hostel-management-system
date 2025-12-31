import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GateLog, Prisma } from '@prisma/client';

@Injectable()
export class GateLogsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.GateLogCreateInput): Promise<GateLog> {
    return this.prisma.gateLog.create({ data });
  }

  findAll(): Promise<GateLog[]> {
    return this.prisma.gateLog.findMany({ include: { resident: true } });
  }

  async findOne(id: string): Promise<GateLog> {
    const log = await this.prisma.gateLog.findUnique({
      where: { id },
      include: { resident: true },
    });
    if (!log) throw new NotFoundException('Gate log not found');
    return log;
  }

  findByResident(residentId: string): Promise<GateLog[]> {
    return this.prisma.gateLog.findMany({
      where: { residentId },
      include: { resident: true },
    });
  }

  async remove(id: string): Promise<GateLog> {
    await this.findOne(id);
    return this.prisma.gateLog.delete({ where: { id } });
  }
}
