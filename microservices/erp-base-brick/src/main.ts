import {} from 'primebrick-sdk/dist/environment';
import { InitializeBrick } from 'primebrick-sdk';
InitializeBrick('erpbase');

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AdvancedLogger, GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk';

class Main {
    static async bootstrap() {
        const advancedLogger = new AdvancedLogger(process.brickName, true);
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.NATS,
            options: {
                url: process.env.NATS_URL,
            },
            logger: advancedLogger,
        });

        app.useGlobalFilters(new GlobalExceptionsFilter());
        app.useGlobalInterceptors(new SessionManagerInterceptor());

        app.listen(() => advancedLogger.info('Erp Core brick listening'));
    }
}

Main.bootstrap();
