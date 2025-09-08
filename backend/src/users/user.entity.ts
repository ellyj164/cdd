import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from '../orders/order.entity';
import { Vendor } from '../vendors/vendor.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export enum AccountType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.INDIVIDUAL,
  })
  accountType: AccountType;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: false })
  phoneVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column('json', { nullable: true })
  socialProviders: string[];

  @Column('simple-json', { nullable: true })
  profile: {
    avatar?: string;
    bio?: string;
    website?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };

  @Column('simple-json', { nullable: true })
  kyc: {
    status: 'unverified' | 'pending' | 'verified' | 'rejected';
    level: 'basic' | 'intermediate' | 'advanced';
    documents: string[];
    verifiedAt?: Date;
  };

  @Column('simple-json', { nullable: true })
  onboarding: {
    currentStep: number;
    totalSteps: number;
    completedSteps: string[];
    skippedSteps: string[];
    lastActivity: Date;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  // Relations
  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @OneToOne(() => Vendor, vendor => vendor.user)
  @JoinColumn()
  vendorProfile: Vendor;
}