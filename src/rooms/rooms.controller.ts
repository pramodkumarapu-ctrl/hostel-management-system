import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Prisma } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() data: Prisma.RoomUncheckedCreateInput) {
    return this.roomsService.create(data);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Get('floor/:floorId')
  findByFloor(@Param('floorId') floorId: string) {
    return this.roomsService.findByFloor(floorId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.RoomUncheckedUpdateInput,
  ) {
    return this.roomsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}