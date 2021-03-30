import { Injectable } from '@nestjs/common';
import { TenantRepositoryService, MessagePayload } from 'primebrick-sdk';
import { SaleOrder } from './entities/SaleOrder.entity';

@Injectable()
export class SaleOrderService {
  constructor(private readonly repositoryService: TenantRepositoryService) {}

  async saveSaleOrder(payload: MessagePayload): Promise<boolean> {
    const saleOrderRepository = await this.repositoryService.getTenantRepository(
      payload.tenantAlias,
      SaleOrder,
    );

    const saleOrder = saleOrderRepository.create();
    saleOrder.name = payload.data.name;
    saleOrder.definition = 'DFDF';
    await saleOrderRepository.save(saleOrder);
    return true;
  }
}
