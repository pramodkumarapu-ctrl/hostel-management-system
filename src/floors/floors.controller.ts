import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { FloorsService } from './floors.service';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  // CREATE
  @Post()
  create(@Body() body: any) {
    return this.floorsService.create(body);
  }

  // READ ALL
  @Get()
  findAll() {
    return this.floorsService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorsService.findOne(id);
  }

  // READ BY HOSTEL
  @Get('hostel/:hostelId')
  findByHostel(@Param('hostelId') hostelId: string) {
    return this.floorsService.findByHostel(hostelId);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.floorsService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorsService.remove(id);
  }
}
