import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BedService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const room = await this.prisma.room.findUnique({ where: { id: data.roomId } });
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });

    if (!room) throw new BadRequestException('Room not found');
    if (!hostel) throw new BadRequestException('Hostel not found');

    return this.prisma.bed.create({ data });
  }

  async findAll() {
    return this.prisma.bed.findMany({
      include: {
        room: true,
        hostel: true,
        resident: true,
      },
    });
  }

  async findOne(id: string) {
    const bed = await this.prisma.bed.findUnique({
      where: { id },
      include: { room: true, hostel: true, resident: true },
    });
    if (!bed) throw new NotFoundException('Bed not found');
    return bed;
  }

  async update(id: string, data: any) {
    const bed = await this.prisma.bed.findUnique({ where: { id } });
    if (!bed) throw new NotFoundException('Bed not found');

    if (data.residentId) {
      const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
      if (!resident) throw new BadRequestException('Resident not found');
    }

    return this.prisma.bed.update({ where: { id }, data });
  }

  async remove(id: string) {
    const bed = await this.prisma.bed.findUnique({ where: { id } });
    if (!bed) throw new NotFoundException('Bed not found');
    return this.prisma.bed.delete({ where: { id } });
  }
}
