import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Hostel } from '@prisma/client';

@Injectable()
export class HostelService {
  constructor(private prisma: PrismaService) {}

  // CREATE HOSTEL
  async create(data: {
    name: string;
    address: string;
    phone: string;
    ownerId: string;
  }): Promise<Hostel> {
    // Check if owner exists
    const owner = await this.prisma.user.findUnique({ where: { id: data.ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');

    return this.prisma.hostel.create({
      data,
      include: {
        owner: true,
        floors: true,
        rooms: true,
        beds: true,
        staff: true,
        timings: true,
        facilities: true,
        foodMenu: true,
      },
    });
  }

  // GET ALL HOSTELS
  async findAll(): Promise<Hostel[]> {
    return this.prisma.hostel.findMany({
      include: {
        owner: true,
        floors: true,
        rooms: true,
        beds: true,
        staff: true,
        timings: true,
        facilities: true,
        foodMenu: true,
      },
    });
  }

  // GET HOSTEL BY ID
  async findOne(id: string): Promise<Hostel> {
    const hostel = await this.prisma.hostel.findUnique({
      where: { id },
      include: {
        owner: true,
        floors: true,
        rooms: true,
        beds: true,
        staff: true,
        timings: true,
        facilities: true,
        foodMenu: true,
      },
    });
    if (!hostel) throw new NotFoundException('Hostel not found');
    return hostel;
  }

  // UPDATE HOSTEL
  async update(
    id: string,
    data: Partial<{ name: string; address: string; phone: string; ownerId: string }>,
  ): Promise<Hostel> {
    if (data.ownerId) {
      const owner = await this.prisma.user.findUnique({ where: { id: data.ownerId } });
      if (!owner) throw new NotFoundException('New owner not found');
    }

    await this.findOne(id); // Throws if not found
    return this.prisma.hostel.update({
      where: { id },
      data,
      include: {
        owner: true,
        floors: true,
        rooms: true,
        beds: true,
        staff: true,
        timings: true,
        facilities: true,
        foodMenu: true,
      },
    });
  }

  // DELETE HOSTEL
  async remove(id: string): Promise<Hostel> {
    await this.findOne(id); // Throws if not found
    return this.prisma.hostel.delete({ where: { id } });
  }
}
