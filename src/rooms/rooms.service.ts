import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Room } from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  // Centralized include object to keep code DRY (Don't Repeat Yourself)
  private readonly roomInclude = {
    floor: true,
    hostel: true,
    beds: { include: { resident: true } },
  };

  // CREATE ROOM
  async create(data: Prisma.RoomUncheckedCreateInput): Promise<Room> {
    return this.prisma.room.create({
      data,
      include: this.roomInclude,
    });
  }

  // GET ALL ROOMS
  async findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({
      include: this.roomInclude,
    });
  }

  // GET ONE ROOM
  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: this.roomInclude,
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  // GET ROOMS BY FLOOR
  async findByFloor(floorId: string): Promise<Room[]> {
    return this.prisma.room.findMany({
      where: { floorId },
      include: this.roomInclude,
    });
  }

  // UPDATE ROOM
  async update(id: string, data: Prisma.RoomUncheckedUpdateInput): Promise<Room> {
    // We check existence first
    await this.findOne(id);

    return this.prisma.room.update({
      where: { id },
      data,
      include: this.roomInclude,
    });
  }

  // DELETE ROOM
  async remove(id: string): Promise<Room> {
    // Check existence before trying to delete
    await this.findOne(id);

    return this.prisma.room.delete({
      where: { id },
      include: this.roomInclude,
    });
  }
}