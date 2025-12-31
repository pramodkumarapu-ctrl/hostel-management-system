import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BedStatus, ResidentStatus } from '@prisma/client';

@Injectable()
export class ResidentService {
  constructor(private prisma: PrismaService) {}

  // CREATE RESIDENT
  async create(data: {
    hostelId: string;
    fullName: string;
    phone: string;
    email: string;
    stayStart: Date;
    stayEnd?: Date;
    bedId?: string;
  }) {
    // Check bed availability
    if (data.bedId) {
      const bed = await this.prisma.bed.findUnique({ where: { id: data.bedId } });
      if (!bed) throw new NotFoundException('Bed not found');
      if (bed.status === BedStatus.OCCUPIED)
        throw new BadRequestException('Bed is already occupied');
    }

    const resident = await this.prisma.resident.create({
      data: {
        hostelId: data.hostelId,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        stayStart: data.stayStart,
        stayEnd: data.stayEnd,
        bed: data.bedId ? { connect: { id: data.bedId } } : undefined,
      },
      include: { bed: true, fees: true, payments: true },
    });

    // Update bed status
    if (data.bedId) {
      await this.prisma.bed.update({
        where: { id: data.bedId },
        data: { status: BedStatus.OCCUPIED, residentId: resident.id },
      });
    }

    return resident;
  }

  // GET ALL RESIDENTS
  async findAll() {
    return this.prisma.resident.findMany({
      include: {
        bed: true,
        fees: true,
        payments: true,
        complaints: true,
        leaves: true,
        visitors: true,
        emergency: true,
        liveStatus: true,
        gateLogs: true,
      },
    });
  }

  // GET ONE RESIDENT
  async findOne(id: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { id },
      include: {
        bed: true,
        fees: true,
        payments: true,
        complaints: true,
        leaves: true,
        visitors: true,
        emergency: true,
        liveStatus: true,
        gateLogs: true,
      },
    });
    if (!resident) throw new NotFoundException('Resident not found');
    return resident;
  }

  // UPDATE RESIDENT
  async update(
    id: string,
    data: Partial<{
      fullName: string;
      phone: string;
      email: string;
      stayStart: Date;
      stayEnd: Date;
      status: ResidentStatus;
      bedId: string;
    }>,
  ) {
    const resident = await this.findOne(id);

    // Handle bed change
    if (data.bedId && data.bedId !== resident.bed?.id) {
      const newBed = await this.prisma.bed.findUnique({ where: { id: data.bedId } });
      if (!newBed) throw new NotFoundException('New bed not found');
      if (newBed.status === BedStatus.OCCUPIED)
        throw new BadRequestException('New bed is already occupied');

      // Free old bed
      if (resident.bed) {
        await this.prisma.bed.update({
          where: { id: resident.bed.id },
          data: { status: BedStatus.AVAILABLE, residentId: null },
        });
      }

      // Occupy new bed
      await this.prisma.bed.update({
        where: { id: newBed.id },
        data: { status: BedStatus.OCCUPIED, residentId: resident.id },
      });
    }

    return this.prisma.resident.update({
      where: { id },
      data: {
        ...data,
        bed: data.bedId ? { connect: { id: data.bedId } } : undefined,
      },
      include: {
        bed: true,
        fees: true,
        payments: true,
      },
    });
  }

  // DELETE RESIDENT
  async remove(id: string) {
    const resident = await this.findOne(id);

    // Free bed if assigned
    if (resident.bed) {
      await this.prisma.bed.update({
        where: { id: resident.bed.id },
        data: { status: BedStatus.AVAILABLE, residentId: null },
      });
    }

    return this.prisma.resident.delete({ where: { id } });
  }
}
