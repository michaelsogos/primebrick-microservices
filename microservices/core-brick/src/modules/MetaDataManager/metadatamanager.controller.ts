import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GlobalRpcAction } from 'primebrick-sdk/enums';
import { MessagePayload } from 'primebrick-sdk/models';
import { MetaTranslation } from './entities/MetaTranslation.entity';
import { MetadataManagerService } from './metadatamanager.service';

@Controller()
export class MetadataManagerController {
    constructor(private readonly metadataManagerService: MetadataManagerService) {}

    @MessagePattern(GlobalRpcAction.GET_TRANSLATION)
    async getAppTranslations(message: MessagePayload<{ group: string; languageCode: string }>): Promise<MessagePayload<MetaTranslation[]>> {
        const result = await this.metadataManagerService.getTranslations(message.data.group, message.data.languageCode);
        return MessagePayload.wrap(result);
    }
}
