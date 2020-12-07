import { Module } from '@nestjs/common';
import { TenantManagerModule } from 'primebrick-sdk';
import { ErpController } from './erp.controller';
import { ErpService } from './erp.service';

@Module({
    imports: [TenantManagerModule],
    providers: [ErpService],
    controllers: [ErpController],
})
export class ErpModule {}
