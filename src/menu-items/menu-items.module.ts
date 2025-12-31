import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FoodMenuController } from './menu-items.controller';
import { FoodMenuService } from './menu-items.service';

@Module({
  controllers: [FoodMenuController],
  providers: [FoodMenuService, PrismaService],
  exports: [FoodMenuService],
})
export class FoodMenuModule {}
