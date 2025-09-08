import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum BannerType {
  HERO = 'hero',
  PROMOTIONAL = 'promotional',
  CATEGORY = 'category',
  SEASONAL = 'seasonal',
}

export enum BannerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SCHEDULED = 'scheduled',
}

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  mobileImageUrl: string;

  @Column({
    type: 'enum',
    enum: BannerType,
    default: BannerType.HERO,
  })
  type: BannerType;

  @Column({
    type: 'enum',
    enum: BannerStatus,
    default: BannerStatus.ACTIVE,
  })
  status: BannerStatus;

  @Column({ nullable: true })
  linkUrl: string;

  @Column({ nullable: true })
  buttonText: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column('simple-json', { nullable: true })
  targetAudience: {
    userRoles?: string[];
    countries?: string[];
    ageGroups?: string[];
  };

  @Column('simple-json', { nullable: true })
  analytics: {
    impressions: number;
    clicks: number;
    ctr: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}