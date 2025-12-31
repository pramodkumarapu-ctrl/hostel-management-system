import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FeeService } from './fee.service';
import { Fee, FeeStatus } from '@prisma/client';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  async create(
    @Body() data: { residentId: string; month: number; year: number; amount: number; status?: FeeStatus },
  ): Promise<Fee> {
    return this.feeService.create(data);
  }

  @Get()
  async findAll(): Promise<Fee[]> {
    return this.feeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Fee> {
    return this.feeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{ amount: number; status: FeeStatus; month: number; year: number }>,
  ): Promise<Fee> {
    return this.feeService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Fee> {
    return this.feeService.remove(id);
  }
}
