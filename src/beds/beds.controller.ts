import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BedService } from './beds.service';


@Controller('beds')
export class BedController {
  constructor(private readonly bedService: BedService) {}

  @Post()
  create(@Body() data: any) {
    return this.bedService.create(data);
  }

  @Get()
  findAll() {
    return this.bedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.bedService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bedService.remove(id);
  }
}
