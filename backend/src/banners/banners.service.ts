import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Banner, BannerType, BannerStatus } from './banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async findActive(type?: BannerType, limit?: number) {
    const now = new Date();
    
    const queryBuilder = this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.status = :status', { status: BannerStatus.ACTIVE })
      .andWhere(
        '(banner.startDate IS NULL OR banner.startDate <= :now)',
        { now }
      )
      .andWhere(
        '(banner.endDate IS NULL OR banner.endDate >= :now)',
        { now }
      );

    if (type) {
      queryBuilder.andWhere('banner.type = :type', { type });
    }

    queryBuilder.orderBy('banner.sortOrder', 'ASC');

    if (limit) {
      queryBuilder.limit(limit);
    }

    return queryBuilder.getMany();
  }

  async getHeroBanners() {
    return this.findActive(BannerType.HERO, 5);
  }

  async trackImpression(bannerId: string) {
    const banner = await this.bannerRepository.findOne({ where: { id: bannerId } });
    if (banner && banner.analytics) {
      banner.analytics.impressions += 1;
      await this.bannerRepository.save(banner);
    }
  }

  async trackClick(bannerId: string) {
    const banner = await this.bannerRepository.findOne({ where: { id: bannerId } });
    if (banner && banner.analytics) {
      banner.analytics.clicks += 1;
      banner.analytics.ctr = banner.analytics.clicks / banner.analytics.impressions;
      await this.bannerRepository.save(banner);
    }
  }
}