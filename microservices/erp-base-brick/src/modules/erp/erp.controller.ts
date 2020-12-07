import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Brick, MessagePayload } from 'primebrick-sdk';
import { ErpService } from './erp.service';

@Controller()
export class ErpController {
    constructor(private readonly erpService: ErpService) {}

    @MessagePattern('saleorder:save')
    async saveSaleOrder(data: MessagePayload<any>): Promise<boolean> {
        console.log(data);
        // this.saleOrderService.saveSaleOrder(data);
        return true;
    }
}
