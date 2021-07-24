import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    TenantManagerModule,
    SessionManagerModule,
    AdvancedLogger,
    TypeOrmConfigService,
    loadConfig,
    AudibleEntitySubscriber,
    ProcessorManagerModule,
    TenantManagerService,
    Brick,
    MicroserviceModule,
    ProcessorManagerService,
    MicroserviceManagerModule,
} from 'primebrick-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BrickManagerModule } from './modules/BrickManager/brickmanager.module';
import { BrickManagerService } from './modules/BrickManager/brickmanager.service';
import { Tenant } from 'primebrick-sdk/dist/modules/TenantManager/entities/Tenant.entity';
import { MetadataManagerModule } from './modules/MetaDataManager/metadatamanager.module';
import { GlobalRouterManagerModule } from './modules/GlobalRouterManager/globalroutermanager.module';
import { AuthenticationManagerModule } from './modules/AuthenticationManager/authenticationmanager.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.app.config.env', '.logger.config.env', '.db.config.env', '.primebrick.config.env', '.env'],
            load: [loadConfig],
        }),
        TypeOrmModule.forRootAsync({
            name: process.env.DB_DATABASE,
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: TypeOrmConfigService,
        }),
        ProcessorManagerModule,
        TenantManagerModule,
        SessionManagerModule,
        BrickManagerModule,
        MetadataManagerModule,
        GlobalRouterManagerModule,
        MicroserviceManagerModule,
        AuthenticationManagerModule
    ],
    providers: [ConfigService, AudibleEntitySubscriber, AdvancedLogger],
})
export class AppModule extends MicroserviceModule {
    constructor(
        readonly tenantManagerService: TenantManagerService,
        readonly processorManagerService: ProcessorManagerService,
        readonly brickManagerService: BrickManagerService,
        readonly logger: AdvancedLogger,
    ) {
        super(tenantManagerService, processorManagerService, logger);
        super.registerBrick = this.registerBrick;
    }

    async registerBrick(tenant: Tenant, brick: Brick): Promise<void> {
        try {
            if (await this.brickManagerService.registerBrick(brick, tenant)) this.logger.debug(`The brick [${brick.code}] has been registered!`);
            else this.logger.debug(`The brick [${brick.code}] cannot be registered!`);
        } catch (ex) {
            this.logger.error(ex);
        }
    }
}
