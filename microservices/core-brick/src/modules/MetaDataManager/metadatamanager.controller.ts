import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePayload } from 'primebrick-sdk';
import { MetaTranslation } from './entities/MetaTranslation.entity';
import { MetadataManagerService } from './metadatamanager.service';

@Controller()
export class MetadataManagerController {
    constructor(private readonly metadataManagerService: MetadataManagerService) {}

    @MessagePattern('translation:all')
    async getAppTranslations(message: MessagePayload<string>): Promise<MessagePayload<MetaTranslation[]>> {
        const result = await this.metadataManagerService.getTranslations(message.data);
        return MessagePayload.wrap(result);
    }
}
