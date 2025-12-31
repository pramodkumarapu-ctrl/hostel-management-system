import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Floor } from '@prisma/client';

@Injectable()
export class FloorsService {
  constructor(private prisma: PrismaService) {}

  // CREATE FLOOR
  create(data: Prisma.FloorCreateInput): Promise<Floor> {
    return this.prisma.floor.create({ data });
  }

  // GET ALL FLOORS
  findAll(): Promise<Floor[]> {
    return this.prisma.floor.findMany({
      include: {
        hostel: true,
        rooms: true, // include only relations defined in schema
      },
    });
  }

  // GET FLOOR BY ID
  async findOne(id: string): Promise<Floor> {
    const floor = await this.prisma.floor.findUnique({
      where: { id },
      include: { hostel: true, rooms: true },
    });
    if (!floor) throw new NotFoundException('Floor not found');
    return floor;
  }

  // GET FLOORS BY HOSTEL
  findByHostel(hostelId: string): Promise<Floor[]> {
    return this.prisma.floor.findMany({
      where: { hostelId },
      include: { rooms: true },
    });
  }

  // UPDATE FLOOR
  async update(id: string, data: Prisma.FloorUpdateInput): Promise<Floor> {
    await this.findOne(id);
    return this.prisma.floor.update({ where: { id }, data });
  }

  // DELETE FLOOR
  async remove(id: string): Promise<Floor> {
    await this.findOne(id);
    return this.prisma.floor.delete({ where: { id } });
  }
}
