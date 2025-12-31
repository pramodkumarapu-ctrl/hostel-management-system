import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from './invoices.service';


@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // GET ALL FEES + PAYMENTS FOR A RESIDENT
  @Get('resident/:residentId')
  async getResidentInvoices(@Param('residentId') residentId: string) {
    return this.invoiceService.getResidentInvoices(residentId);
  }
}
