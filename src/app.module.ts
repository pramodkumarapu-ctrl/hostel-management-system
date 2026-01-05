import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
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
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    FeaturesModule,
    UsersModule,
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
  controllers: [AppController], // Only global controllers
  providers: [AppService, PrismaService], // Only global providers
})
export class AppModule {}
