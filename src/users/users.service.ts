import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // CREATE USER
  async create(data: any) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
  }

  // GET ALL USERS
  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
  }

  // GET USER BY ID
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // FIND BY EMAIL (for login)
async findByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: { email },
  });
}



  // UPDATE USER
  update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // DELETE USER
  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
