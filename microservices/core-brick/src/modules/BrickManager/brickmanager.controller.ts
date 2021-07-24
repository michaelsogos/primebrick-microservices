import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Brick, GlobalRpcAction, MessagePayload } from 'primebrick-sdk';
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
