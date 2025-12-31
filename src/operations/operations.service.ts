import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(data: any) {
    // Validate resident if provided
    if (data.residentId) {
      const resident = await this.prisma.resident.findUnique({
        where: { id: data.residentId },
      });
      if (!resident) throw new NotFoundException('Resident not found');
    }

    // Validate user if provided
    if (data.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });
      if (!user) throw new NotFoundException('User not found');
    }

    if (!data.action) {
      throw new BadRequestException('Action is required');
    }

    return this.prisma.operationLog.create({
      data: {
        action: data.action,
        details: data.details,
        type: data.type ?? 'General',
        worker: data.worker,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        leavingDate: data.leavingDate ? new Date(data.leavingDate) : undefined,
        paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
        resident: data.residentId ? { connect: { id: data.residentId } } : undefined,
        user: data.userId ? { connect: { id: data.userId } } : undefined,
      },
    });
  }

  // READ ALL
  findAll() {
    return this.prisma.operationLog.findMany({
      include: {
        resident: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ONE
  findOne(id: string) {
    return this.prisma.operationLog.findUnique({
      where: { id },
      include: { resident: true, user: true },
    });
  }

  // UPDATE
  async update(id: string, data: any) {
    const log = await this.prisma.operationLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Operation not found');

    if (data.type && typeof data.type !== 'string') {
      throw new BadRequestException('Type must be a string');
    }

    return this.prisma.operationLog.update({
      where: { id },
      data: {
        action: data.action ?? log.action,
        details: data.details ?? log.details,
        type: data.type ?? log.type,
        worker: data.worker ?? log.worker,
        startDate: data.startDate ? new Date(data.startDate) : log.startDate,
        endDate: data.endDate ? new Date(data.endDate) : log.endDate,
        leavingDate: data.leavingDate ? new Date(data.leavingDate) : log.leavingDate,
        paymentDate: data.paymentDate ? new Date(data.paymentDate) : log.paymentDate,
      },
    });
  }

  // DELETE
  async remove(id: string) {
    const log = await this.prisma.operationLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Operation not found');

    return this.prisma.operationLog.delete({ where: { id } });
  }
}
