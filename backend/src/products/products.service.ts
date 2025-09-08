import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThan } from 'typeorm';
import { Product, ProductStatus } from './product.entity';

interface FindAllOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

interface SearchOptions {
  limit?: number;
  offset?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(options: FindAllOptions = {}) {
    const { category, featured, limit, offset } = options;
    
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .where('product.status = :status', { status: ProductStatus.ACTIVE });

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (featured !== undefined) {
      queryBuilder.andWhere('product.featured = :featured', { featured });
    }

    if (limit) {
      queryBuilder.limit(limit);
    }

    if (offset) {
      queryBuilder.offset(offset);
    }

    queryBuilder.orderBy('product.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    return this.productRepository.findOne({
      where: { id, status: ProductStatus.ACTIVE },
      relations: ['vendor'],
    });
  }

  async getFeatured(limit: number = 8) {
    return this.productRepository.find({
      where: { 
        featured: true,
        status: ProductStatus.ACTIVE 
      },
      relations: ['vendor'],
      order: { rating: 'DESC', salesCount: 'DESC' },
      take: limit,
    });
  }

  async getTrending(limit: number = 8) {
    // Products with high view count and recent sales
    return this.productRepository.find({
      where: { 
        status: ProductStatus.ACTIVE,
        viewCount: MoreThan(100),
      },
      relations: ['vendor'],
      order: { 
        viewCount: 'DESC', 
        salesCount: 'DESC',
        createdAt: 'DESC' 
      },
      take: limit,
    });
  }

  async getDeals(limit: number = 8) {
    // Products with compare price higher than current price (indicating discount)
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .where('product.status = :status', { status: ProductStatus.ACTIVE })
      .andWhere('product.compareAtPrice > product.price')
      .orderBy('(product.compareAtPrice - product.price) / product.compareAtPrice', 'DESC')
      .limit(limit);

    return queryBuilder.getMany();
  }

  async getRecommendations(userId?: string, limit: number = 8) {
    // For now, return highly rated products
    // In future, implement user-based collaborative filtering
    return this.productRepository.find({
      where: { 
        status: ProductStatus.ACTIVE,
        rating: MoreThan(4.0),
      },
      relations: ['vendor'],
      order: { 
        rating: 'DESC', 
        reviewCount: 'DESC',
        salesCount: 'DESC' 
      },
      take: limit,
    });
  }

  async getCategoryStats() {
    const stats = await this.productRepository
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('product.status = :status', { status: ProductStatus.ACTIVE })
      .groupBy('product.category')
      .orderBy('count', 'DESC')
      .getRawMany();

    return stats.map(stat => ({
      category: stat.category,
      count: parseInt(stat.count),
    }));
  }

  async search(query: string, options: SearchOptions = {}) {
    const { limit, offset } = options;
    
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .where('product.status = :status', { status: ProductStatus.ACTIVE })
      .andWhere(
        '(product.name ILIKE :query OR product.description ILIKE :query OR product.category ILIKE :query)',
        { query: `%${query}%` }
      )
      .orderBy('product.rating', 'DESC')
      .addOrderBy('product.salesCount', 'DESC');

    if (limit) {
      queryBuilder.limit(limit);
    }

    if (offset) {
      queryBuilder.offset(offset);
    }

    return queryBuilder.getMany();
  }

  // Admin/Vendor methods for creating/updating products would go here
}