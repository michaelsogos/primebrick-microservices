import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { AdvancedLogger } from 'primebrick-sdk/core';
import { AuthTokenPayload, UserProfile } from 'primebrick-sdk/models';
import { LocalAuthManagerService, TenantManagerService, TenantRepositoryService } from 'primebrick-sdk/modules';
import { Login } from './entities/Login.entity';
import { User } from './entities/User.entity';
import { UserCredentials } from './models/UserCredentials';

@Injectable()
export class AuthenticationManagerService {
    constructor(
        private readonly repositoryService: TenantRepositoryService,
        private readonly tenantManagerService: TenantManagerService,
        private readonly localAuthManagerService: LocalAuthManagerService,
        private readonly logger: AdvancedLogger,
    ) {}

    async login(credentials: UserCredentials): Promise<AuthTokenPayload> {
        try {
            const tenant = this.tenantManagerService.getTenantConfig();

            let user: User = null;
            switch (tenant.tenant_auth_config.auth_type) {
                case 'local':
                    {
                        user = await this.localAuthenticate(credentials);
                    }
                    break;
                case 'oauth2':
                    throw new NotImplementedException();
                case 'saml2':
                    throw new NotImplementedException();
            }

            const payload = this.localAuthManagerService.createAuthenticationToken(tenant, this.createUserProfileFromUser(user));

            return payload;
        } catch (ex) {
            this.logger.error(ex);
            throw new UnauthorizedException('Credentials are invalid!');
        }
    }

    async refreshToken(refreshToken: string, accessToken: string): Promise<AuthTokenPayload> {
        const tenant = this.tenantManagerService.getTenantConfig();

        switch (tenant.tenant_auth_config.auth_type) {
            case 'local': {
                try {
                    await this.localAuthManagerService.verifyAuthenticationToken(refreshToken, tenant);

                    const decodedAccessToken = (await this.localAuthManagerService.verifyAuthenticationToken(
                        accessToken,
                        tenant,
                        true,
                    )) as UserProfile;

                    const userProfile = this.createUserProfileFromUser(await this.getUserProfile(decodedAccessToken.code));

                    const payload = this.localAuthManagerService.createAuthenticationToken(tenant, userProfile);

                    return payload;
                } catch (ex) {
                    throw new UnauthorizedException('Authorization refresh token is not valid!');
                }
            }
            case 'oauth2':
                throw new NotImplementedException();
            case 'saml2':
                throw new NotImplementedException();
        }
    }

    private async localAuthenticate(credentials: UserCredentials): Promise<User> {
        const loginRepository = await this.repositoryService.getTenantRepository(Login);

        const userLogIn = await loginRepository.findOneOrFail(null, {
            where: { username: credentials.username },
            relations: ['user'],
        });

        const isPasswordValid = this.localAuthManagerService.verifyPassword(userLogIn.password, credentials.password);

        if (isPasswordValid) return userLogIn.user;
        else throw new UnauthorizedException('Credentials are invalid!');
    }

    private async getUserProfile(userCode: string): Promise<User> {
        const loginRepository = await this.repositoryService.getTenantRepository(User);
        const user = await loginRepository.findOneOrFail({
            where: {
                code: userCode,
            },
        });

        return user;
    }

    private createUserProfileFromUser(user: User): UserProfile {
        const userProfile = new UserProfile();
        userProfile.id = user.id;
        userProfile.code = user.code;
        userProfile.email = user.email;
        userProfile.firstName = user.firstName;
        userProfile.lastName = user.lastName;
        userProfile.languageCode = user.languageCode;
        userProfile.roles = user.roles.map((role) => role.name);

        return userProfile;
    }
}
