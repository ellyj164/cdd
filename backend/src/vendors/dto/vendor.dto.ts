import { IsString, IsOptional, IsArray, IsObject, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { VendorStatus } from '../vendor.entity';

export class BusinessAddressDto {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  zipCode: string;
}

export class ContactInfoDto {
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export class BankingDetailsDto {
  @ApiProperty()
  @IsString()
  accountName: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsString()
  routingNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  swiftCode?: string;
}

export class BusinessDocumentsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessLicense?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  taxCertificate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  insuranceCertificate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bankStatement?: string;
}

export class CreateVendorDto {
  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  businessRegistrationNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiProperty({ required: false, type: BusinessAddressDto })
  @IsOptional()
  @IsObject()
  businessAddress?: BusinessAddressDto;

  @ApiProperty({ required: false, type: ContactInfoDto })
  @IsOptional()
  @IsObject()
  contactInfo?: ContactInfoDto;

  @ApiProperty({ required: false, type: BankingDetailsDto })
  @IsOptional()
  @IsObject()
  bankingDetails?: BankingDetailsDto;

  @ApiProperty({ required: false, type: BusinessDocumentsDto })
  @IsOptional()
  @IsObject()
  businessDocuments?: BusinessDocumentsDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  categories?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  shippingMethods?: {
    domestic: string[];
    international: string[];
    freeShippingThreshold?: number;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  returnPolicy?: {
    acceptsReturns: boolean;
    returnWindow: number;
    returnConditions: string[];
  };
}

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
  @ApiProperty({ enum: VendorStatus, required: false })
  @IsOptional()
  @IsEnum(VendorStatus)
  status?: VendorStatus;
}

export class VendorOnboardingDto {
  @ApiProperty()
  businessInfo: {
    businessName: string;
    businessDescription: string;
    businessType: string;
    registrationNumber?: string;
    taxId?: string;
    foundedYear?: string;
    employeeCount?: string;
    website?: string;
  };

  @ApiProperty()
  contactInfo: {
    email: string;
    phone: string;
    address: BusinessAddressDto;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };

  @ApiProperty()
  productInfo: {
    categories: string[];
    shippingMethods: string[];
    returnPolicy: {
      acceptsReturns: boolean;
      returnWindow: number;
      conditions: string[];
    };
    inventory: {
      hasInventorySystem: boolean;
      trackingMethod: string;
    };
  };

  @ApiProperty()
  bankingInfo: BankingDetailsDto;
}