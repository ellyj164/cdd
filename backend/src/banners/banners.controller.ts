import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import { BannerType } from './banner.entity';

@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: 'Get banners for homepage' })
  @ApiQuery({ name: 'type', required: false, enum: BannerType })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async findAll(
    @Query('type') type?: BannerType,
    @Query('limit') limit?: number,
  ) {
    return this.bannersService.findActive(type, limit);
  }

  @Get('hero')
  @ApiOperation({ summary: 'Get hero banners for carousel' })
  async getHeroBanners() {
    return this.bannersService.getHeroBanners();
  }
}