import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { OrderItem } from '../orders/order-item.entity';

export enum ProductStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

@Entity('products')
@Index(['name', 'description'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  compareAtPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costPrice: number;

  @Column()
  @Index()
  category: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column('json', { nullable: true })
  images: string[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @Column({ default: 0 })
  inventory: number;

  @Column({ default: false })
  trackInventory: boolean;

  @Column({ default: false })
  allowBackorder: boolean;

  @Column({ type: 'decimal', precision: 8, scale: 3, nullable: true })
  weight: number;

  @Column('simple-json', { nullable: true })
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };

  @Column('simple-json', { nullable: true })
  variants: Array<{
    id: string;
    name: string;
    price: number;
    sku?: string;
    inventory: number;
    image?: string;
    attributes: Record<string, string>;
  }>;

  @Column('simple-json', { nullable: true })
  attributes: Record<string, any>;

  @Column('simple-json', { nullable: true })
  seoMetadata: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  @Column('simple-json', { nullable: true })
  shippingInfo: {
    requiresShipping: boolean;
    shippingClass?: string;
    handlingTime?: number; // days
  };

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  salesCount: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Vendor, vendor => vendor.products)
  vendor: Vendor;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}