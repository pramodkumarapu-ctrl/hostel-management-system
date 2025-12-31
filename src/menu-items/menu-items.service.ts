import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FoodMenu, DayType, MealType } from '@prisma/client';

@Injectable()
export class FoodMenuService {
  constructor(private prisma: PrismaService) {}

  // CREATE FOOD MENU
  async create(data: {
    hostelId: string;
    dayType: DayType;
    specificDay?: string;  // optional: MONDAY, TUESDAY...
    mealType: MealType;
    items: string;
    startTime: string;
    endTime: string;
  }): Promise<FoodMenu> {
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
    if (!hostel) throw new NotFoundException('Hostel not found');

    return this.prisma.foodMenu.create({
      data,
      include: { hostel: true },
    });
  }

  // GET ALL FOOD MENUS
  async findAll(): Promise<FoodMenu[]> {
    return this.prisma.foodMenu.findMany({ include: { hostel: true } });
  }

  // GET FOOD MENU BY ID
  async findOne(id: string): Promise<FoodMenu> {
    const menu = await this.prisma.foodMenu.findUnique({
      where: { id },
      include: { hostel: true },
    });
    if (!menu) throw new NotFoundException('Food menu not found');
    return menu;
  }

  // GET MENU BY HOSTEL + DAYTYPE + OPTIONAL SPECIFIC DAY
  async findByHostelDay(
    hostelId: string,
    dayType: DayType,
    specificDay?: string,
  ): Promise<FoodMenu[]> {
    return this.prisma.foodMenu.findMany({
      where: { hostelId, dayType,  },
      include: { hostel: true },
    });
  }

  // UPDATE FOOD MENU
  async update(
    id: string,
    data: Partial<{
      items: string;
      startTime: string;
      endTime: string;
      mealType: MealType;
      dayType: DayType;
      specificDay?: string;
    }>,
  ): Promise<FoodMenu> {
    await this.findOne(id); // Throws if not found
    return this.prisma.foodMenu.update({
      where: { id },
      data,
      include: { hostel: true },
    });
  }

  // DELETE FOOD MENU
  async remove(id: string): Promise<FoodMenu> {
    await this.findOne(id); // Throws if not found
    return this.prisma.foodMenu.delete({ where: { id } });
  }
}
