import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from '@prisma/client';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // CREATE STAFF
  @Post()
  async create(
    @Body() data: { userId: string; hostelId: string; role: string; phone: string },
  ): Promise<Staff> {
    return this.staffService.create(data);
  }

  // GET ALL STAFF
  @Get()
  async findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  // GET STAFF BY ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Staff> {
    return this.staffService.findOne(id);
  }

  // UPDATE STAFF
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{ role: string; phone: string; hostelId: string }>,
  ): Promise<Staff> {
    return this.staffService.update(id, data);
  }

  // DELETE STAFF
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Staff> {
    return this.staffService.remove(id);
  }
}
