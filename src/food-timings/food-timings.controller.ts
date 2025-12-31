import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DayType } from '@prisma/client';
import { HostelTimingService } from './food-timings.service';

@Controller('hostel-timings')
export class HostelTimingController {
  constructor(private readonly timingService: HostelTimingService) {}

  // CREATE
  @Post()
  async create(
    @Body() data: { hostelId: string; dayType: DayType; inTime: string; outTime: string },
  ) {
    return this.timingService.create(data);
  }

  // GET ALL
  @Get()
  async findAll() {
    return this.timingService.findAll();
  }

  // GET BY ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.timingService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{ inTime: string; outTime: string; dayType: DayType }>,
  ) {
    return this.timingService.update(id, data);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.timingService.remove(id);
  }
}
