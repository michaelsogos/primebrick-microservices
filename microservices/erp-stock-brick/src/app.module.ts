import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    TenantManagerModule,
    SessionManagerModule,
    AudibleEntitySubscriber,
    AdvancedLogger,
    TypeOrmConfigService,
    loadConfig,
    MicroserviceModule,
    ProcessorManagerModule,
    TenantManagerService,
    ProcessorManagerService,
    MicroserviceManagerModule,
} from 'primebrick-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StockModule } from './modules/stock/stock.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.app.config.env', '.logger.config.env', '.db.config.env', '.primebrick.config.env', '.env'],
            load: [loadConfig],
        }),
        TypeOrmModule.forRootAsync({
            name: 'primebrick_coordinator',
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: TypeOrmConfigService,
        }),
        ClientsModule.register([
            {
                name: 'PRIMEBRICK_SERVICE',
                transport: Transport.NATS,
                options: { url: process.env.NATS_URL || 'nats://localhost:4222' },
            },
        ]),
        ProcessorManagerModule,
        MicroserviceManagerModule,
        TenantManagerModule,
        SessionManagerModule,
        StockModule,
    ],
    controllers: [],
    providers: [ConfigService, AudibleEntitySubscriber, AdvancedLogger],
})
export class AppModule extends MicroserviceModule {
    constructor(
        readonly tenantManagerService: TenantManagerService,
        readonly processorManagerService: ProcessorManagerService,
        readonly logger: AdvancedLogger,
    ) {
        super(tenantManagerService, processorManagerService, logger);
    }
}
