import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { CreateVendorDto, UpdateVendorDto, VendorOnboardingDto } from './dto/vendor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { VendorStatus } from './vendor.entity';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create vendor profile' })
  async create(@Body() createVendorDto: CreateVendorDto, @Request() req) {
    return this.vendorsService.create(createVendorDto, req.user.id);
  }

  @Post('onboarding')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete vendor onboarding process' })
  async completeOnboarding(@Body() onboardingDto: VendorOnboardingDto, @Request() req) {
    return this.vendorsService.completeOnboarding(onboardingDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  async findAll(@Query('status') status?: VendorStatus) {
    return this.vendorsService.findAll(status);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pending vendor applications (Admin only)' })
  async getPendingApplications() {
    return this.vendorsService.findAll(VendorStatus.PENDING);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my vendor profile' })
  async getMyProfile(@Request() req) {
    return this.vendorsService.findByUserId(req.user.id);
  }

  @Get('me/stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my vendor statistics' })
  async getMyStats(@Request() req) {
    return this.vendorsService.getVendorStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vendor by ID' })
  async findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get vendor statistics' })
  async getVendorStats(@Param('id') id: string) {
    return this.vendorsService.getVendorStatsById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update vendor profile' })
  async update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto, @Request() req) {
    return this.vendorsService.update(id, updateVendorDto, req.user.id);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve vendor (Admin only)' })
  async approve(@Param('id') id: string) {
    return this.vendorsService.approve(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject vendor (Admin only)' })
  async reject(@Param('id') id: string) {
    return this.vendorsService.reject(id);
  }

  @Patch(':id/suspend')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Suspend vendor (Admin only)' })
  async suspend(@Param('id') id: string) {
    return this.vendorsService.suspend(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete vendor (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.vendorsService.remove(id);
  }
}