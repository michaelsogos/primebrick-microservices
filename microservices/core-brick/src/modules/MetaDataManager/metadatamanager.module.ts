import { Module } from '@nestjs/common';
import { AdvancedLogger, TenantManagerModule } from 'primebrick-sdk';
import { MetadataManagerController } from './metadatamanager.controller';
import { MetadataManagerService } from './metadatamanager.service';

@Module({
    imports: [TenantManagerModule],
    controllers: [MetadataManagerController],
    providers: [MetadataManagerService, AdvancedLogger],
})
export class MetadataManagerModule {}
