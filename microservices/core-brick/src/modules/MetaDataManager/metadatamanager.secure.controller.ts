import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppManifest, AuthGuard, GlobalRpcAction, MessagePayload, ViewDefinition } from 'primebrick-sdk';
import { BrickManagerService } from '../BrickManager/brickmanager.service';
import { MetaView } from './entities/MetaView.entity';
import { MetadataManagerService } from './metadatamanager.service';
import { MenuItemResponse } from './models/MenuItemResponse';

@Controller()
@UseGuards(AuthGuard)
export class MetadataManagerSecureController {
    constructor(private readonly metadataManagerService: MetadataManagerService, private readonly brickManagerService: BrickManagerService) {}

    @MessagePattern(GlobalRpcAction.REGISTER_VIEW)
    async registerView(message: MessagePayload<ViewDefinition>): Promise<MessagePayload<boolean>> {
        const result = await this.metadataManagerService.registerView(message.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern(GlobalRpcAction.GET_ALL_VIEWS)
    async getAllViews(): Promise<MessagePayload<MetaView[]>> {
        const result = await this.metadataManagerService.getAllViews();
        return MessagePayload.wrap(result);
    }

    @MessagePattern(GlobalRpcAction.GET_VIEW)
    async getView(message: MessagePayload<string>): Promise<MessagePayload<MetaView>> {
        const result = await this.metadataManagerService.getView(message.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern(GlobalRpcAction.GET_SIDEMENU)
    async getSideMenu(): Promise<MessagePayload<MenuItemResponse[]>> {
        const result = await this.metadataManagerService.getMenuItems();
        return MessagePayload.wrap(result);
    }

    @MessagePattern(GlobalRpcAction.GET_APP_MANIFEST)
    async getAppManifest(): Promise<MessagePayload<AppManifest>> {
        //TODO: @mso -> Collect those information from DB or ENV file or external JSON (not from package json in order to be customizable from ISV)

        const appManifest = new AppManifest();
        appManifest.author = 'GuruStudioWeb';
        appManifest.copyright = 'MIT';
        appManifest.documentationURL = 'https://primebrick.io/docs';
        appManifest.name = 'PrimeBrick';
        appManifest.supportURL = 'https://primebrick.io/support';
        appManifest.version = '0.1.0';
        appManifest.installedBricks = [];

        const bricks = await this.brickManagerService.getInstalledBrick();
        for (const brick of bricks)
            appManifest.installedBricks.push({
                code: brick.code,
                name: brick.module,
                version: brick.brickVersion,
            });

        return MessagePayload.wrap(appManifest);
    }
}
