import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

export enum VendorStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
}

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  businessDescription: string;

  @Column({ unique: true, nullable: true })
  businessRegistrationNumber: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({
    type: 'enum',
    enum: VendorStatus,
    default: VendorStatus.PENDING,
  })
  status: VendorStatus;

  @Column('simple-json', { nullable: true })
  businessAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  @Column('simple-json', { nullable: true })
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };

  @Column('simple-json', { nullable: true })
  bankingDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    swiftCode?: string;
  };

  @Column('simple-json', { nullable: true })
  businessDocuments: {
    businessLicense?: string;
    taxCertificate?: string;
    insuranceCertificate?: string;
    bankStatement?: string;
  };

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalOrders: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalRevenue: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column('json', { nullable: true })
  categories: string[];

  @Column('simple-json', { nullable: true })
  shippingMethods: {
    domestic: string[];
    international: string[];
    freeShippingThreshold?: number;
  };

  @Column('simple-json', { nullable: true })
  returnPolicy: {
    acceptsReturns: boolean;
    returnWindow: number; // days
    returnConditions: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  approvedAt: Date;

  // Relations
  @OneToOne(() => User, user => user.vendorProfile)
  user: User;

  @OneToMany(() => Product, product => product.vendor)
  products: Product[];
}