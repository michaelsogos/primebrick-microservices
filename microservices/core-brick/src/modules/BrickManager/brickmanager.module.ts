import { Module } from '@nestjs/common';
import { TenantManagerModule } from 'primebrick-sdk/modules';
import { BrickManagerController } from './brickmanager.controller';
import { BrickManagerService } from './brickmanager.service';

@Module({
    imports: [TenantManagerModule],
    providers: [BrickManagerService],
    controllers: [BrickManagerController],
    exports: [BrickManagerService],
})
export class BrickManagerModule {}
