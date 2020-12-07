import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AdvancedLogger, GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk';

global['appModuleName'] = 'core';

async function bootstrap() {
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

bootstrap();
