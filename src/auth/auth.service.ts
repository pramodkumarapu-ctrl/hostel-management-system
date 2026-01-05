import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from '../prisma/prisma.service';
 // Ensure this path is correct
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  register(body: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, // Inject Prisma here
  ) {}

  async login(email: string, pass: string) {
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    // 2. If user doesn't exist, throw error
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    // 3. Compare hashed password
    const isMatch = await bcrypt.compare(pass, user.password);
    
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    // 4. Return token and user data
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}