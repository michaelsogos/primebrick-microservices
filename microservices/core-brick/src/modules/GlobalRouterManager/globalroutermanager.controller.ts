import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DataImport, DataImportLog, MessagePayload } from 'primebrick-sdk';
import { GlobalRouterManagerService } from './globalroutermanager.service';

@Controller()
export class GlobalRouterManagerController {
    constructor(private readonly globalRouterManagerService: GlobalRouterManagerService) {}

    @MessagePattern('route:dataimport')
    async routeDataImport(message: MessagePayload<DataImport>): Promise<MessagePayload<DataImportLog>> {
        const result = await this.globalRouterManagerService.routeDataImport(message.data);
        return MessagePayload.wrap(result);
    }
}
