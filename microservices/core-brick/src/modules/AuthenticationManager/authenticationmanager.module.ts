import { Module } from '@nestjs/common';
import { AdvancedLogger } from 'primebrick-sdk/core';
import { AuthManagerModule, LocalAuthManagerService, TenantManagerModule } from 'primebrick-sdk/modules';
import { AuthenticationManagerController } from './authenticationmanager.controller';
import { AuthenticationManagerService } from './authenticationmanager.service';

@Module({
    imports: [TenantManagerModule, AuthManagerModule],
    controllers: [AuthenticationManagerController],
    providers: [LocalAuthManagerService, AuthenticationManagerService, AdvancedLogger],
    exports: [],
})
export class AuthenticationManagerModule {}
