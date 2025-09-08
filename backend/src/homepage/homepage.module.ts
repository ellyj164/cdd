import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { ProductsModule } from '../products/products.module';
import { BannersModule } from '../banners/banners.module';

@Module({
  imports: [ProductsModule, BannersModule],
  controllers: [HomepageController],
  providers: [HomepageService],
  exports: [HomepageService],
})
export class HomepageModule {}