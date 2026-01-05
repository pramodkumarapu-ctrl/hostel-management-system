import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  // CREATE FEATURE
  create(data: { name: string; icon?: string; hostelId: string }) {
    return this.prisma.feature.create({ data });
  }

  // FIND ALL
  findAll() {
    return this.prisma.feature.findMany();
  }

  // FIND ONE
  async findOne(id: string) {
    const feature = await this.prisma.feature.findUnique({ where: { id } });
    if (!feature) throw new NotFoundException('Feature not found');
    return feature;
  }

  // UPDATE
  update(id: string, data: { name?: string; icon?: string }) {
    return this.prisma.feature.update({
      where: { id },
      data,
    });
  }

  // DELETE
  remove(id: string) {
    return this.prisma.feature.delete({ where: { id } });
  }
}
