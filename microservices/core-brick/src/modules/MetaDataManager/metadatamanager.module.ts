import { Module } from '@nestjs/common';
import { AdvancedLogger, SessionManagerModule, TenantManagerModule } from 'primebrick-sdk';
import { MetadataManagerController } from './metadatamanager.controller';
import { MetadataManagerSecureController } from './metadatamanager.secure.controller';
import { MetadataManagerService } from './metadatamanager.service';

@Module({
    imports: [TenantManagerModule,SessionManagerModule],
    controllers: [MetadataManagerController, MetadataManagerSecureController],
    providers: [MetadataManagerService, AdvancedLogger],
})
export class MetadataManagerModule {}
