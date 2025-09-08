import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor, VendorStatus } from './vendor.entity';
import { CreateVendorDto, UpdateVendorDto, VendorOnboardingDto } from './dto/vendor.dto';
import { User } from '../users/user.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createVendorDto: CreateVendorDto, userId: string): Promise<Vendor> {
    const vendor = this.vendorRepository.create({
      ...createVendorDto,
      user: { id: userId },
    });

    return this.vendorRepository.save(vendor);
  }

  async completeOnboarding(onboardingDto: VendorOnboardingDto, userId: string): Promise<Vendor> {
    // Create vendor profile from onboarding data
    const vendorData: CreateVendorDto = {
      businessName: onboardingDto.businessInfo.businessName,
      businessDescription: onboardingDto.businessInfo.businessDescription,
      businessRegistrationNumber: onboardingDto.businessInfo.registrationNumber,
      taxId: onboardingDto.businessInfo.taxId,
      businessAddress: onboardingDto.contactInfo.address,
      contactInfo: {
        phone: onboardingDto.contactInfo.phone,
        email: onboardingDto.contactInfo.email,
        website: onboardingDto.businessInfo.website,
        socialMedia: onboardingDto.contactInfo.socialMedia,
      },
      bankingDetails: onboardingDto.bankingInfo,
      categories: onboardingDto.productInfo.categories,
      shippingMethods: {
        domestic: onboardingDto.productInfo.shippingMethods,
        international: [],
        freeShippingThreshold: 0,
      },
      returnPolicy: {
        acceptsReturns: onboardingDto.productInfo.returnPolicy.acceptsReturns,
        returnWindow: onboardingDto.productInfo.returnPolicy.returnWindow,
        returnConditions: onboardingDto.productInfo.returnPolicy.conditions,
      },
    };

    // Check if vendor profile already exists
    const existingVendor = await this.findByUserId(userId);
    if (existingVendor) {
      // Update existing profile
      return this.update(existingVendor.id, vendorData, userId);
    } else {
      // Create new vendor profile
      return this.create(vendorData, userId);
    }
  }

  async findAll(status?: VendorStatus): Promise<Vendor[]> {
    const query = this.vendorRepository.createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.user', 'user')
      .select([
        'vendor.id',
        'vendor.businessName',
        'vendor.businessDescription',
        'vendor.status',
        'vendor.rating',
        'vendor.totalOrders',
        'vendor.verified',
        'vendor.featured',
        'vendor.categories',
        'vendor.createdAt',
        'user.id',
        'user.name',
        'user.email',
      ]);

    if (status) {
      query.where('vendor.status = :status', { status });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    return vendor;
  }

  async findByUserId(userId: string): Promise<Vendor | null> {
    return this.vendorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getVendorStats(userId: string): Promise<any> {
    const vendor = await this.findByUserId(userId);
    if (!vendor) {
      throw new NotFoundException('Vendor profile not found');
    }
    return this.getVendorStatsById(vendor.id);
  }

  async getVendorStatsById(vendorId: string): Promise<any> {
    const vendor = await this.findOne(vendorId);
    
    // Mock statistics - in real implementation, these would come from orders, products, etc.
    return {
      vendorId: vendor.id,
      businessName: vendor.businessName,
      totalProducts: 0, // Would query products table
      totalOrders: vendor.totalOrders,
      totalRevenue: vendor.totalRevenue,
      averageRating: vendor.rating,
      totalReviews: vendor.totalReviews,
      recentOrdersCount: 0, // Last 30 days
      conversionRate: 0, // Would calculate from analytics
      topSellingProducts: [], // Would query from sales data
      monthlyRevenue: [], // Last 12 months
      orderStatusBreakdown: {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
      },
      lowStockProducts: [], // Products with low inventory
      recentActivity: [], // Recent orders, products added, etc.
    };
  }

  async update(id: string, updateVendorDto: UpdateVendorDto, userId?: string): Promise<Vendor> {
    const vendor = await this.findOne(id);
    
    // Check if user is the owner or admin
    if (userId && vendor.user.id !== userId) {
      throw new ForbiddenException('You can only update your own vendor profile');
    }

    Object.assign(vendor, updateVendorDto);
    return this.vendorRepository.save(vendor);
  }

  async approve(id: string): Promise<Vendor> {
    const vendor = await this.findOne(id);
    vendor.status = VendorStatus.ACTIVE;
    vendor.approvedAt = new Date();
    vendor.verified = true;
    return this.vendorRepository.save(vendor);
  }

  async reject(id: string): Promise<Vendor> {
    const vendor = await this.findOne(id);
    vendor.status = VendorStatus.REJECTED;
    return this.vendorRepository.save(vendor);
  }

  async suspend(id: string): Promise<Vendor> {
    const vendor = await this.findOne(id);
    vendor.status = VendorStatus.SUSPENDED;
    return this.vendorRepository.save(vendor);
  }

  async remove(id: string): Promise<void> {
    const vendor = await this.findOne(id);
    await this.vendorRepository.remove(vendor);
  }

  async updateStats(vendorId: string, stats: {
    totalOrders?: number;
    totalRevenue?: number;
    rating?: number;
    totalReviews?: number;
  }): Promise<void> {
    await this.vendorRepository.update(vendorId, stats);
  }
}