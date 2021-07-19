import { Controller } from '@nestjs/common';
import { AuthTokenPayload, MessagePayload } from 'primebrick-sdk';
import { UserCredentials } from './models/UserCredentials';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AuthenticationManagerService } from './authenticationmanager.service';

@Controller()
export class AuthenticationManagerController {
    constructor(private readonly authenticationManagerService: AuthenticationManagerService) {}

    @MessagePattern('auth:login')
    async login(credentials: MessagePayload<UserCredentials>): Promise<MessagePayload<AuthTokenPayload>> {
        const result = await this.authenticationManagerService.login(credentials.data);
        return MessagePayload.wrap(result);
    }

    @MessagePattern('auth:refresh_token')
    async refreshToken(authTokenPayload: MessagePayload<AuthTokenPayload>): Promise<MessagePayload<AuthTokenPayload>> {
        if (!authTokenPayload.data.access_token) throw new RpcException('Access token missing on MessagePayload data!');

        // const access_token = authTokenPayload.data.access_token.split(' ')[1];
        // if (!access_token) throw new RpcException('Authorization bearer access token malformed!');

        const result = await this.authenticationManagerService.refreshToken(authTokenPayload.data.refresh_token, authTokenPayload.data.access_token);

        return MessagePayload.wrap(result);
    }
}
