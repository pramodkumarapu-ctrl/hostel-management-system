import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
  exports: [PaymentService],
})
export class PaymentModule {}
