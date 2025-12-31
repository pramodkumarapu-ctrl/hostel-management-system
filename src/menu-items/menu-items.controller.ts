import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';

import { FoodMenu, DayType, MealType } from '@prisma/client';
import { FoodMenuService } from './menu-items.service';

@Controller('food-menu')
export class FoodMenuController {
  constructor(private readonly foodMenuService: FoodMenuService) {}

  // CREATE FOOD MENU
  @Post()
  async create(
    @Body() data: {
      hostelId: string;
      dayType: DayType;
      specificDay?: string;
      mealType: MealType;
      items: string;
      startTime: string;
      endTime: string;
    },
  ): Promise<FoodMenu> {
    return this.foodMenuService.create(data);
  }

  // GET ALL FOOD MENUS
  @Get()
  async findAll(): Promise<FoodMenu[]> {
    return this.foodMenuService.findAll();
  }

  // GET FOOD MENU BY ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FoodMenu> {
    return this.foodMenuService.findOne(id);
  }

  // GET MENU BY HOSTEL + DAYTYPE + OPTIONAL SPECIFIC DAY
  @Get('hostel/:hostelId')
  async findByHostelDay(
    @Param('hostelId') hostelId: string,
    @Query('dayType') dayType: DayType,
    @Query('specificDay') specificDay?: string,
  ): Promise<FoodMenu[]> {
    return this.foodMenuService.findByHostelDay(hostelId, dayType, specificDay);
  }

  // UPDATE FOOD MENU
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<{
      items: string;
      startTime: string;
      endTime: string;
      mealType: MealType;
      dayType: DayType;
      specificDay?: string;
    }>,
  ): Promise<FoodMenu> {
    return this.foodMenuService.update(id, data);
  }

  // DELETE FOOD MENU
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<FoodMenu> {
    return this.foodMenuService.remove(id);
  }
}
