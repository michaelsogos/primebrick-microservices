import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AdvancedLogger } from 'primebrick-sdk/core';
import { MainBoot } from 'primebrick-sdk/decorators';
import { GlobalExceptionsFilter, SessionManagerInterceptor } from 'primebrick-sdk/nest';

@MainBoot('core')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Main {
    static async start(): Promise<void> {
        //This is mandatory to be done in this way else AppModule will load sdk DataAccess controller too early, when process.brickName is not defined yet
        const appModule = (await import('./app.module')).AppModule;
        //TODO: @mso -> move instance of AdvencedLogger into @MainBoot() in order to be inject as argument for start() method
        const advancedLogger = new AdvancedLogger(process.brickName, true);
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(appModule, {
            transport: Transport.NATS,
            options: {
                url: process.env.NATS_URL,
            },
            logger: advancedLogger,
        });

        app.useGlobalFilters(new GlobalExceptionsFilter());
        app.useGlobalInterceptors(new SessionManagerInterceptor());

        app.listen().then(() => advancedLogger.info('Core brick listening'));
    }
}

// Main.bootstrap();
