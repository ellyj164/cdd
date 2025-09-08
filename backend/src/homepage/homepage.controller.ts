import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';

@ApiTags('homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all homepage data in one request' })
  async getHomepageData() {
    return this.homepageService.getHomepageData();
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get homepage performance metrics' })
  async getPerformanceMetrics() {
    return this.homepageService.getPerformanceMetrics();
  }
}