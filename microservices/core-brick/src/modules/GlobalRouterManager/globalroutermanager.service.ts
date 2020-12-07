import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
    ComposeModuleRpcAction,
    DataImport,
    MicroserviceManagerService,
    ModuleRpcAction,
    ProcessorManagerService,
    TenantRepositoryService,
} from 'primebrick-sdk';
import { DataImportLog } from 'primebrick-sdk/dist/core/models/DataImportLog';

@Injectable()
export class GlobalRouterManagerService {
    constructor(
        private readonly repositoryService: TenantRepositoryService,
        private readonly microserviceManagerService: MicroserviceManagerService,
        private readonly processorManagerService: ProcessorManagerService,
    ) {}

    async routeDataImport(dataImport: DataImport): Promise<DataImportLog> {
        const connection = await this.repositoryService.getTenantConnection();
        const queryBuilder = connection.createQueryBuilder('MetaBrick', 'mb');
        queryBuilder
            .select(['mb.module'])
            .innerJoin('MetaEntity', 'me', 'me.brick = mb.id')
            .where('me.name = :entityName', { entityName: dataImport.definition.csvOptions.entity });
        const moduleName = await queryBuilder.getRawOne<string>();

        if (!moduleName)
            throw new RpcException(
                `Cannot route [dataimport] for entity [${dataImport.definition.csvOptions.entity}] because not registered under any module!`,
            );

        if (moduleName == global['appModuleName']) return await this.microserviceManagerService.importData(dataImport);
        else {
            const response = await this.processorManagerService.sendMessage<DataImport, DataImportLog>(
                ComposeModuleRpcAction(moduleName, ModuleRpcAction.IMPORT_DATA),
                dataImport,
            );

            return response.data;
        }
    }
}
