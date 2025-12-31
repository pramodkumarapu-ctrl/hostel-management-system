import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ResidentService } from './residents.service';
import { ResidentStatus } from '@prisma/client';

@Controller('residents')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post()
  async create(@Body() data: {
    hostelId: string;
    fullName: string;
    phone: string;
    email: string;
    stayStart: Date;
    stayEnd?: Date;
    bedId?: string;
  }) {
    return this.residentService.create(data);
  }

  @Get()
  async findAll() {
    return this.residentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.residentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{
      fullName: string;
      phone: string;
      email: string;
      stayStart: Date;
      stayEnd: Date;
      status: ResidentStatus;
      bedId: string;
    }>,
  ) {
    return this.residentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.residentService.remove(id);
  }
}
