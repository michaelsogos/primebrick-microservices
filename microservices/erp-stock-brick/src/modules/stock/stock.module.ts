import { Module } from '@nestjs/common';
import { TenantManagerModule } from 'primebrick-sdk';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
    imports: [TenantManagerModule],
    providers: [StockService],
    controllers: [StockController],
})
export class StockModule {}
