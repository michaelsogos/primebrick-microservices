import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SaleOrderService } from './saleorder.service';
import { MessagePayload } from 'primebrick-sdk';

@Controller()
export class SaleOrderController {
  constructor(private readonly saleOrderService: SaleOrderService) {}

  @MessagePattern('saleorder:save')
  async saveSaleOrder(data: MessagePayload): Promise<boolean> {
    console.log(data);
    this.saleOrderService.saveSaleOrder(data);
    return true;
  }
}
