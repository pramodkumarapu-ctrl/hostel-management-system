import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DayType } from '@prisma/client';

@Injectable()
export class HostelTimingService {
  constructor(private prisma: PrismaService) {}

  // CREATE TIMING
  async create(data: {
    hostelId: string;
    dayType: DayType;
    inTime: string;
    outTime: string;
  }) {
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
    if (!hostel) throw new NotFoundException('Hostel not found');

    return this.prisma.hostelTiming.create({
      data,
      include: { hostel: true },
    });
  }

  // GET ALL TIMINGS
  async findAll() {
    return this.prisma.hostelTiming.findMany({ include: { hostel: true } });
  }

  // GET TIMING BY ID
  async findOne(id: string) {
    const timing = await this.prisma.hostelTiming.findUnique({
      where: { id },
      include: { hostel: true },
    });
    if (!timing) throw new NotFoundException('Hostel timing not found');
    return timing;
  }

  // UPDATE TIMING
  async update(
    id: string,
    data: Partial<{ inTime: string; outTime: string; dayType: DayType }>,
  ) {
    await this.findOne(id); // Throw if not found
    return this.prisma.hostelTiming.update({
      where: { id },
      data,
      include: { hostel: true },
    });
  }

  // DELETE TIMING
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.hostelTiming.delete({ where: { id } });
  }
}
