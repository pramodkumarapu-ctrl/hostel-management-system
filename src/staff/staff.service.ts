import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Staff } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  // CREATE STAFF
  async create(data: {
    userId: string;
    hostelId: string;
    role: string;
    phone: string;
  }): Promise<Staff> {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new NotFoundException('User not found');

    // Check if hostel exists
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
    if (!hostel) throw new NotFoundException('Hostel not found');

    return this.prisma.staff.create({
      data,
      include: { user: true, hostel: true },
    });
  }

  // GET ALL STAFF
  async findAll(): Promise<Staff[]> {
    return this.prisma.staff.findMany({ include: { user: true, hostel: true } });
  }

  // GET STAFF BY ID
  async findOne(id: string): Promise<Staff> {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: { user: true, hostel: true },
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  // UPDATE STAFF
  async update(
    id: string,
    data: Partial<{ role: string; phone: string; hostelId: string }>,
  ): Promise<Staff> {
    const staff = await this.findOne(id);

    // If hostelId changed, verify new hostel
    if (data.hostelId && data.hostelId !== staff.hostelId) {
      const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
      if (!hostel) throw new NotFoundException('New hostel not found');
    }

    return this.prisma.staff.update({
      where: { id },
      data,
      include: { user: true, hostel: true },
    });
  }

  // DELETE STAFF
  async remove(id: string): Promise<Staff> {
    await this.findOne(id);
    return this.prisma.staff.delete({ where: { id } });
  }
}
