import { Injectable } from '@nestjs/common';
import { TenantRepositoryService, MessagePayload } from 'primebrick-sdk';

@Injectable()
export class ErpService {
    constructor(private readonly repositoryService: TenantRepositoryService) {}

    // async saveSaleOrder(payload: MessagePayload): Promise<boolean> {
    //   const saleOrderRepository = await this.repositoryService.getTenantRepository(
    //     payload.tenantAlias,
    //     SaleOrder,
    //   );

    //   const saleOrder = saleOrderRepository.create();
    //   saleOrder.name = payload.data.name;
    //   saleOrder.definition = 'DFDF';
    //   await saleOrderRepository.save(saleOrder);
    //   return true;
    // }
}
