import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations') // ✅ route matches /operations
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  // CREATE
  @Post()
  create(@Body() body: any) {
    return this.operationsService.create(body);
  }

  // READ ALL
  @Get()
  findAll() {
    return this.operationsService.findAll();
  }

  // READ ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const log = await this.operationsService.findOne(id);
    if (!log) throw new NotFoundException('Operation not found');
    return log;
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.operationsService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}
