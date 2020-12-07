import { Module } from '@nestjs/common';
import { MicroserviceManagerModule, ProcessorManagerModule, TenantManagerModule } from 'primebrick-sdk';
import { GlobalRouterManagerController } from './globalroutermanager.controller';
import { GlobalRouterManagerService } from './globalroutermanager.service';

@Module({
    imports: [TenantManagerModule, MicroserviceManagerModule, ProcessorManagerModule],
    providers: [GlobalRouterManagerService],
    controllers: [GlobalRouterManagerController],
    exports: [],
})
export class GlobalRouterManagerModule {}
