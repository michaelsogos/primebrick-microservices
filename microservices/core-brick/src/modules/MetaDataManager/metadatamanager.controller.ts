import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload, ViewDefinition } from 'primebrick-sdk';
import { MetaView } from './entities/MetaView.entity';
import { MetadataManagerService } from './metadatamanager.service';

@Controller()
export class MetadataManagerController {
    constructor(private readonly metadataManagerService: MetadataManagerService) {}

    @MessagePattern('view:register')
    async registerView(message: MessagePayload<ViewDefinition>): Promise<MessagePayload<boolean>> {
        const result = await this.metadataManagerService.registerView(message.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern('view:all')
    async getAllViews(message: MessagePayload<any>): Promise<MessagePayload<MetaView[]>> {
        const result = await this.metadataManagerService.getAllViews();
        return MessagePayload.wrap(result);
    }

    @MessagePattern('view:get')
    async getView(message: MessagePayload<string>): Promise<MessagePayload<MetaView>> {
        const result = await this.metadataManagerService.getView(message.data);
        return MessagePayload.wrap(result);
    }
}
