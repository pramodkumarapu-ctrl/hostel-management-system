import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

// Feature Modules
import { UsersModule } from './users/users.module';
import { FeaturesModule } from './features/features.module';
import { OperationsModule } from './operations/operations.module';
import { FloorsModule } from './floors/floors.module';
import { RoomsModule } from './rooms/rooms.module';
import { BedModule } from './beds/beds.module';
import { GateLogsModule } from './gate-logs/gate-logs.module';
import { StaffModule } from './staff/staff.module';
import { FeeModule } from './fee/fee.module';
import { HostelModule } from './hostel/hostels.module';
import { FoodMenuModule } from './menu-items/menu-items.module';
import { InvoiceModule } from './invoices/invoices.module';
import { PaymentModule } from './payments/payments.module';
import { ResidentModule } from './residents/residents.module';

@Module({
  imports: [
    // 🔐 JWT GLOBAL (VERY IMPORTANT)
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'superSecretKey',
      signOptions: { expiresIn: '1d' },
    }),

    UsersModule,
    FeaturesModule,
    HostelModule,
    FoodMenuModule,
    OperationsModule,
    InvoiceModule,
    ResidentModule,
    FloorsModule,
    RoomsModule,
    BedModule,
    GateLogsModule,
    StaffModule,
    FeeModule,
    PaymentModule,
  ],
  controllers: [AppController], // ✅ ONLY AppController
  providers: [AppService, PrismaService],
})
export class AppModule {}
