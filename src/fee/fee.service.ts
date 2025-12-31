import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Fee, FeeStatus } from '@prisma/client';

@Injectable()
export class FeeService {
  constructor(private prisma: PrismaService) {}

  // CREATE FEE
  async create(data: {
    residentId: string;
    month: number;
    year: number;
    amount: number;
    status?: FeeStatus;
  }): Promise<Fee> {
    // Check if resident exists
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new NotFoundException('Resident not found');

    return this.prisma.fee.create({
      data: {
        residentId: data.residentId,
        month: data.month,
        year: data.year,
        amount: data.amount,
        status: data.status || FeeStatus.UNPAID,
      },
      include: { resident: true, payments: true },
    });
  }

  // GET ALL FEES
  async findAll(): Promise<Fee[]> {
    return this.prisma.fee.findMany({ include: { resident: true, payments: true } });
  }

  // GET FEE BY ID
  async findOne(id: string): Promise<Fee> {
    const fee = await this.prisma.fee.findUnique({
      where: { id },
      include: { resident: true, payments: true },
    });
    if (!fee) throw new NotFoundException('Fee not found');
    return fee;
  }

  // UPDATE FEE
  async update(
    id: string,
    data: Partial<{ amount: number; status: FeeStatus; month: number; year: number }>,
  ): Promise<Fee> {
    await this.findOne(id); // Throws if not found
    return this.prisma.fee.update({
      where: { id },
      data,
      include: { resident: true, payments: true },
    });
  }

  // DELETE FEE
  async remove(id: string): Promise<Fee> {
    await this.findOne(id);
    return this.prisma.fee.delete({ where: { id } });
  }
}
