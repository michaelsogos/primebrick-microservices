import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DataImportLog } from 'primebrick-sdk/dist/core/models/DataImportLog';
import { ComposeModuleRpcAction, DataRpcAction } from 'primebrick-sdk/enums';
import { DataImport } from 'primebrick-sdk/models';
import { MicroserviceManagerService, ProcessorManagerService, TenantRepositoryService } from 'primebrick-sdk/modules';

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
        const queryResult = await queryBuilder.getRawOne();

        if (!queryResult.mb_module)
            throw new RpcException(
                `Cannot route [data:import] for entity [${dataImport.definition.csvOptions.entity}] because not registered under any module!`,
            );

        if (queryResult.mb_module == process.brickName) return await this.microserviceManagerService.importData(dataImport);
        else {
            const response = await this.processorManagerService.sendMessage<DataImport, DataImportLog>(
                ComposeModuleRpcAction(queryResult.mb_module, DataRpcAction.DATA_IMPORT),
                dataImport,
            );

            return response.data;
        }
    }
}
