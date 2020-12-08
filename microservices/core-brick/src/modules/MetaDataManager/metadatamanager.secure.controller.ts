import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard, MessagePayload, ViewDefinition } from 'primebrick-sdk';
import { MetaView } from './entities/MetaView.entity';
import { MetadataManagerService } from './metadatamanager.service';
import { MetaMenuItem } from 'primebrick-commons-core';

@Controller()
@UseGuards(AuthGuard)
export class MetadataManagerSecureController {
    constructor(private readonly metadataManagerService: MetadataManagerService) {}

    @MessagePattern('view:register')
    async registerView(message: MessagePayload<ViewDefinition>): Promise<MessagePayload<boolean>> {
        const result = await this.metadataManagerService.registerView(message.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern('view:all')
    async getAllViews(): Promise<MessagePayload<MetaView[]>> {
        const result = await this.metadataManagerService.getAllViews();
        return MessagePayload.wrap(result);
    }

    @MessagePattern('view:get')
    async getView(message: MessagePayload<string>): Promise<MessagePayload<MetaView>> {
        const result = await this.metadataManagerService.getView(message.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern('sidemenu:get')
    async getSideMenu(): Promise<MessagePayload<MetaMenuItem[]>> {
        const result = await this.metadataManagerService.getMenuItems();
        return MessagePayload.wrap(result);
    }

    @MessagePattern('info')
    async getAppInfo(): Promise<MessagePayload<any>> {
        //TODO: @mso -> Collect those information from DB or external JSON (not from package json in order to be customizable from ISV)
        return MessagePayload.wrap({
            description: 'PrimeBrick',
            version: '0.1.0',
            author: 'GuruStudioWeb',
            copyright: 'MIT',
            supportURL: 'http://primebrick.io',
        });
    }
}
