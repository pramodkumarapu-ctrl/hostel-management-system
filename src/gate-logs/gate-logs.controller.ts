import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { GateLogsService } from './gate-logs.service';

@Controller('gate-logs')
export class GateLogsController {
  constructor(private readonly gateLogsService: GateLogsService) {}

  @Post()
  create(@Body() body: any) {
    return this.gateLogsService.create(body);
  }

  @Get()
  findAll() {
    return this.gateLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gateLogsService.findOne(id);
  }

  @Get('resident/:residentId')
  findByResident(@Param('residentId') residentId: string) {
    return this.gateLogsService.findByResident(residentId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gateLogsService.remove(id);
  }
}
