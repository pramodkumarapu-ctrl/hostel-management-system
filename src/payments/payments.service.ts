import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment, PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // CREATE PAYMENT
  async create(data: {
    feeId: string;
    residentId: string;
    amount: number;
    method: PaymentMethod;
  }): Promise<Payment> {
    const fee = await this.prisma.fee.findUnique({ where: { id: data.feeId } });
    if (!fee) throw new NotFoundException('Fee not found');

    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new NotFoundException('Resident not found');

    return this.prisma.payment.create({
      data,
      include: { fee: true, resident: true },
    });
  }

  // GET ALL PAYMENTS
  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany({ include: { fee: true, resident: true } });
  }

  // GET PAYMENT BY ID
  async findOne(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { fee: true, resident: true },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  // UPDATE PAYMENT
  async update(
    id: string,
    data: Partial<{ amount: number; method: PaymentMethod }>,
  ): Promise<Payment> {
    await this.findOne(id); // Throws if not found
    return this.prisma.payment.update({
      where: { id },
      data,
      include: { fee: true, resident: true },
    });
  }

  // DELETE PAYMENT
  async remove(id: string): Promise<Payment> {
    await this.findOne(id);
    return this.prisma.payment.delete({ where: { id } });
  }
}
