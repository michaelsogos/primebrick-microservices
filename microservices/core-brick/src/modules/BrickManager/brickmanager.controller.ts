import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GlobalRpcAction } from 'primebrick-sdk/enums';
import { Brick, MessagePayload } from 'primebrick-sdk/models';
import { BrickManagerService } from './brickmanager.service';

@Controller()
export class BrickManagerController {
    constructor(private readonly brickManagerService: BrickManagerService) {}

    @MessagePattern(GlobalRpcAction.REGISTER_BRICK)
    async registerBrick(message: MessagePayload<Brick>): Promise<MessagePayload<boolean>> {
        const result = await this.brickManagerService.registerBrick(message.data);
        return MessagePayload.wrap(result);
    }
}
