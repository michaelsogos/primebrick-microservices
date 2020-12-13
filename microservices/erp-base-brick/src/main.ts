import {} from 'primebrick-sdk/dist/environment';
process.brickName = 'erpbase';

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AdvancedLogger, GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk';

class Main {
    static async bootstrap() {
        if (!process.brickName) throw new Error('Cannot initialize brick with empty or invalid name! process.brickName must be a valid name.');

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
