import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Payment, PaymentMethod } from '@prisma/client';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(
    @Body() data: { feeId: string; residentId: string; amount: number; method: PaymentMethod },
  ): Promise<Payment> {
    return this.paymentService.create(data);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{ amount: number; method: PaymentMethod }>,
  ): Promise<Payment> {
    return this.paymentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.remove(id);
  }
}
