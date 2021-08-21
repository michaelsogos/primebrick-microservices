import { Module } from '@nestjs/common';
import { AuthManagerModule, LocalAuthManagerService, LogManagerModule, TenantManagerModule } from 'primebrick-sdk/modules';
import { AuthenticationManagerController } from './authenticationmanager.controller';
import { AuthenticationManagerService } from './authenticationmanager.service';

@Module({
    imports: [TenantManagerModule, AuthManagerModule, LogManagerModule],
    controllers: [AuthenticationManagerController],
    providers: [LocalAuthManagerService, AuthenticationManagerService],
    exports: [],
})
export class AuthenticationManagerModule {}
