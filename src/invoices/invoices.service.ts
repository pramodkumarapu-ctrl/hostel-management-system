import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  // GET ALL FEES WITH PAYMENTS FOR A RESIDENT
  async getResidentInvoices(residentId: string) {
    // Check if resident exists
    const resident = await this.prisma.resident.findUnique({ where: { id: residentId } });
    if (!resident) throw new NotFoundException('Resident not found');

    // Fetch fees with payments
    const fees = await this.prisma.fee.findMany({
      where: { residentId },
      include: {
        payments: true,
      },
      orderBy: { year: 'desc', month: 'desc' },
    });

    return {
      resident,
      invoices: fees,
    };
  }
}
