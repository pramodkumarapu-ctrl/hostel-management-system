import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { Hostel } from '@prisma/client';
import { HostelService } from './hostels.service';

@Controller('hostels')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  // CREATE HOSTEL
  @Post()
  async create(
    @Body() data: { name: string; address: string; phone: string; ownerId: string },
  ): Promise<Hostel> {
    return this.hostelService.create(data);
  }

  // GET ALL HOSTELS
  @Get()
  async findAll(): Promise<Hostel[]> {
    return this.hostelService.findAll();
  }

  // GET HOSTEL BY ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hostel> {
    return this.hostelService.findOne(id);
  }

  // UPDATE HOSTEL
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; address: string; phone: string; ownerId: string }>,
  ): Promise<Hostel> {
    return this.hostelService.update(id, data);
  }

  // DELETE HOSTEL
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Hostel> {
    return this.hostelService.remove(id);
  }
}
