// apps/backend/src/modules/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@intelliwave/database';
import { UpdateUserDto, CreateApiKeyDto, UpdatePreferencesDto } from './dto/user.dto';
import { EncryptionUtil } from '@intelliwave/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        derivAccounts: true,
        tradingAccounts: true,
        subscriptions: {
          where: { status: 'ACTIVE' },
        },
        riskProfiles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, twoFactorSecret, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check username uniqueness if being updated
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: updateUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username already taken');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        username: updateUserDto.username,
        phone: updateUserDto.phone,
        avatar: updateUserDto.avatar,
      },
    });

    const { passwordHash, twoFactorSecret, ...safeUser } = updatedUser;
    return safeUser;
  }

  async updatePreferences(userId: string, preferencesDto: UpdatePreferencesDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentMetadata = (user.metadata as any) || {};
    
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        metadata: {
          ...currentMetadata,
          preferences: preferencesDto,
        },
      },
    });

    return { message: 'Preferences updated successfully' };
  }

  async getTradingAccounts(userId: string) {
    return this.prisma.tradingAccount.findMany({
      where: { userId },
      include: {
        positions: {
          where: { isOpen: true },
        },
      },
    });
  }

  async createTradingAccount(userId: string, data: { name: string; description?: string }) {
    const account = await this.prisma.tradingAccount.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
      },
    });

    return account;
  }

  async getDerivAccounts(userId: string) {
    return this.prisma.derivAccount.findMany({
      where: { userId, isActive: true },
    });
  }

  async createApiKey(userId: string, createApiKeyDto: CreateApiKeyDto) {
    const apiKey = EncryptionUtil.generateToken(32);
    const apiSecret = EncryptionUtil.generateToken(64);

    const key = await this.prisma.apiKey.create({
      data: {
        userId,
        name: createApiKeyDto.name,
        key: apiKey,
        secret: apiSecret,
        permissions: createApiKeyDto.permissions || ['read'],
        expiresAt: createApiKeyDto.expiresAt ? new Date(createApiKeyDto.expiresAt) : null,
      },
    });

    return {
      id: key.id,
      name: key.name,
      key: apiKey,
      secret: apiSecret,
      permissions: key.permissions,
      expiresAt: key.expiresAt,
      message: 'Make sure to save your secret key. You won\'t be able to see it again!',
    };
  }

  async getApiKeys(userId: string) {
    return this.prisma.apiKey.findMany({
      where: { userId, isActive: true },
      select: {
        id: true,
        name: true,
        key: true,
        permissions: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  async revokeApiKey(userId: string, keyId: string) {
    const key = await this.prisma.apiKey.findFirst({
      where: { id: keyId, userId },
    });

    if (!key) {
      throw new NotFoundException('API key not found');
    }

    await this.prisma.apiKey.update({
      where: { id: keyId },
      data: { isActive: false },
    });

    return { message: 'API key revoked successfully' };
  }

  async getRiskProfiles(userId: string) {
    return this.prisma.riskProfile.findMany({
      where: { userId },
    });
  }

  async createRiskProfile(userId: string, data: any) {
    return this.prisma.riskProfile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async updateRiskProfile(userId: string, profileId: string, data: any) {
    const profile = await this.prisma.riskProfile.findFirst({
      where: { id: profileId, userId },
    });

    if (!profile) {
      throw new NotFoundException('Risk profile not found');
    }

    return this.prisma.riskProfile.update({
      where: { id: profileId },
      data,
    });
  }

  async deleteRiskProfile(userId: string, profileId: string) {
    const profile = await this.prisma.riskProfile.findFirst({
      where: { id: profileId, userId },
    });

    if (!profile) {
      throw new NotFoundException('Risk profile not found');
    }

    // Check if any bots are using this profile
    const botsUsingProfile = await this.prisma.bot.findMany({
      where: { riskProfileId: profileId },
    });

    if (botsUsingProfile.length > 0) {
      throw new BadRequestException(
        `Cannot delete risk profile. It's being used by ${botsUsingProfile.length} bot(s)`,
      );
    }

    await this.prisma.riskProfile.delete({
      where: { id: profileId },
    });

    return { message: 'Risk profile deleted successfully' };
  }
}