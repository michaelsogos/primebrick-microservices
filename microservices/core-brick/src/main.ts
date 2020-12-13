global['appModuleName'] = 'core'; //TODO: @mso -> move it on process.env.BRICK_NAME but pay attention to not confuse it with package.json and in entity MetaBrick.module

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AdvancedLogger, GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk';

class Main {
    static async bootstrap() {
        const advancedLogger = new AdvancedLogger(global['appModuleName'], true);
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
            transport: Transport.NATS,
            options: {
                url: process.env.NATS_URL,
            },
            logger: advancedLogger,
        });

        app.useGlobalFilters(new GlobalExceptionsFilter());
        app.useGlobalInterceptors(new SessionManagerInterceptor());

        app.listen(() => advancedLogger.info('Core brick listening'));
    }
}

Main.bootstrap();
