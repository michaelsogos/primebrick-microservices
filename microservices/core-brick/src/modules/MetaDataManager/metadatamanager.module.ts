import { Module } from '@nestjs/common';
import { AdvancedLogger, SessionManagerModule, TenantManagerModule } from 'primebrick-sdk';
import { BrickManagerModule } from '../BrickManager/brickmanager.module';
import { MetadataManagerController } from './metadatamanager.controller';
import { MetadataManagerSecureController } from './metadatamanager.secure.controller';
import { MetadataManagerService } from './metadatamanager.service';

@Module({
    imports: [TenantManagerModule, SessionManagerModule, BrickManagerModule],
    controllers: [MetadataManagerController, MetadataManagerSecureController],
    providers: [MetadataManagerService, AdvancedLogger],
})
export class MetadataManagerModule {}
