import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AdvancedLogger, GlobalExceptionsFilter, RegisterBrick, SessionManagerInterceptor } from 'primebrick-sdk';

@RegisterBrick('erpbase')
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

        app.listen(() => advancedLogger.info('Erp Core brick listening'));
    }
}

Main.bootstrap();
