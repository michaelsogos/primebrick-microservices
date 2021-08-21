import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MainBoot } from 'primebrick-sdk/decorators';
import { GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk/nest';

@MainBoot('core')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Main {
    static async start(): Promise<void> {
        //This is mandatory to be done in this way else AppModule will load sdk DataAccess controller too early, when process.brickName is not defined yet
        const appModule = (await import('./app.module')).AppModule;
        const logManagerService = (await import('primebrick-sdk/modules')).LogManagerService;

        const app = await NestFactory.createMicroservice<MicroserviceOptions>(appModule, {
            transport: Transport.NATS,
            options: {
                url: process.env.NATS_URL,
            },
            bufferLogs: true,
        });

        const logger = app.get(logManagerService);

        app.useLogger(logger);
        app.useGlobalFilters(new GlobalExceptionsFilter());
        app.useGlobalInterceptors(new SessionManagerInterceptor());

        app.listen().then(() => logger.info('Core brick listening'));
    }
}

// Main.bootstrap();
