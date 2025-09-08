import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filtering' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'featured', required: false, type: 'boolean' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  async findAll(
    @Query('category') category?: string,
    @Query('featured') featured?: boolean,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.productsService.findAll({
      category,
      featured,
      limit,
      offset,
    });
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products for homepage' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getFeatured(@Query('limit') limit?: number) {
    return this.productsService.getFeatured(limit || 8);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending products based on views and sales' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getTrending(@Query('limit') limit?: number) {
    return this.productsService.getTrending(limit || 8);
  }

  @Get('deals')
  @ApiOperation({ summary: 'Get products with significant discounts' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getDeals(@Query('limit') limit?: number) {
    return this.productsService.getDeals(limit || 8);
  }

  @Get('recommendations/:userId?')
  @ApiOperation({ summary: 'Get personalized product recommendations' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async getRecommendations(
    @Param('userId') userId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.productsService.getRecommendations(userId, limit || 8);
  }

  @Get('categories/stats')
  @ApiOperation({ summary: 'Get product counts by category' })
  async getCategoryStats() {
    return this.productsService.getCategoryStats();
  }

  @Get('search/:query')
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  async search(
    @Param('query') query: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.productsService.search(query, { limit, offset });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}