import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findAll() {
    return this.orderRepository.find({ relations: ['customer', 'items'] });
  }

  async findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'items'],
    });
  }
}