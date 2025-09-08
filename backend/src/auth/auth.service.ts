import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    // Try to find user by email or phone
    let user = await this.usersService.findByEmail(identifier);
    if (!user) {
      user = await this.usersService.findByPhone(identifier);
    }

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.identifier, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      accountType: user.accountType 
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        accountType: user.accountType,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    if (registerDto.email) {
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    if (registerDto.phone) {
      const existingUser = await this.usersService.findByPhone(registerDto.phone);
      if (existingUser) {
        throw new ConflictException('User with this phone number already exists');
      }
    }

    if (!registerDto.email && !registerDto.phone) {
      throw new BadRequestException('Either email or phone number is required');
    }

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
    });

    // Activate user (in production, might require verification)
    await this.usersService.update(user.id, { isActive: true });

    // Return login response
    return this.login({
      identifier: registerDto.email || registerDto.phone,
      password: registerDto.password,
    });
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid token');
      }

      const newPayload = { 
        sub: user.id, 
        email: user.email, 
        role: user.role,
        accountType: user.accountType 
      };

      return {
        access_token: this.jwtService.sign(newPayload),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // In a production system, you might want to blacklist the token
    // For now, we'll just return success
    return { message: 'Logged out successfully' };
  }
}