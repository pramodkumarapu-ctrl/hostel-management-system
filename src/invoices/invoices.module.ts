import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { InvoiceController } from './invoices.controller';
import { InvoiceService } from './invoices.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService],
})
export class InvoiceModule {}
