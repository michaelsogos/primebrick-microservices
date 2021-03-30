import { Module } from '@nestjs/common';
import { SaleOrderService } from './saleorder.service';
import { SaleOrderController } from './saleorder.controller';
import { TenantManagerModule } from 'primebrick-sdk';

@Module({
  imports: [TenantManagerModule],
  providers: [SaleOrderService],
  controllers: [SaleOrderController],
})
export class SaleOrderModule {}
