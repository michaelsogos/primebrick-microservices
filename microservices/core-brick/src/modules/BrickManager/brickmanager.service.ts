import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TenantRepositoryService, Brick } from 'primebrick-sdk';
import { Tenant } from 'primebrick-sdk/dist/modules/TenantManager/entities/Tenant.entity';
import { In, Not, Repository } from 'typeorm';
import { MetaBrick } from './entities/MetaBrick.entity';
import { MetaEntity } from './entities/MetaEntity.entity';

@Injectable()
export class BrickManagerService {
    constructor(private readonly repositoryService: TenantRepositoryService) {}

    async registerBrick(brick: Brick, tenant?: Tenant): Promise<boolean> {
        try {
            let metaBrickRepository: Repository<MetaBrick> = null;
            let metaEntityRepository: Repository<MetaEntity> = null;
            if (tenant) {
                const tenantDbConnection = await this.repositoryService.getDbConnectionByTenant(tenant);
                metaBrickRepository = tenantDbConnection.getRepository(MetaBrick);
                metaEntityRepository = tenantDbConnection.getRepository(MetaEntity);
            } else {
                metaBrickRepository = await this.repositoryService.getTenantRepository(MetaBrick);
                metaEntityRepository = await this.repositoryService.getTenantRepository(MetaEntity);
            }

            let registeredBrick = await metaBrickRepository.findOne({
                where: {
                    code: brick.code,
                },
            });

            if (!registeredBrick) registeredBrick = new MetaBrick();
            if (registeredBrick.brickVersion != brick.version) {
                registeredBrick.autoInstall = brick.autoInstall;
                registeredBrick.brickVersion = brick.version;
                registeredBrick.code = brick.code;
                registeredBrick.description = brick.description;
                registeredBrick.module = brick.name;

                registeredBrick = await metaBrickRepository.save(registeredBrick);
            }

            for (const entityName of brick.entities) {
                let registeredEntity = await metaEntityRepository.findOne({
                    where: {
                        name: entityName,
                        brick: registeredBrick,
                    },
                });

                if (!registeredEntity) {
                    registeredEntity = new MetaEntity();
                    registeredEntity.brick = registeredBrick;
                    registeredEntity.name = entityName;
                    await metaEntityRepository.save(registeredEntity);
                }
            }

            await metaEntityRepository.delete({
                name: Not(In([...brick.entities])),
                brick: registeredBrick,
            });

            return true;
        } catch (ex) {
            //TODO: @michaelsogos -> send error to logging system
            throw new RpcException(ex.stack);
        }
    }
}
