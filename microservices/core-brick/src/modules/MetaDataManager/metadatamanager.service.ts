import { Injectable } from '@nestjs/common';
import { TenantRepositoryService, ViewDefinition } from 'primebrick-sdk';
import { MetaView } from './entities/MetaView.entity';

@Injectable()
export class MetadataManagerService {
    constructor(private readonly repositoryService: TenantRepositoryService) {}

    async registerView(viewDefinition: ViewDefinition): Promise<boolean> {
        const metaViewRepository = await this.repositoryService.getTenantRepository(MetaView);

        let existingView = await metaViewRepository.findOne({
            where: { name: viewDefinition.name },
        });

        if (!existingView) existingView = metaViewRepository.create();
        existingView.name = viewDefinition.name;
        existingView.definition = viewDefinition.definition;
        await metaViewRepository.save(existingView);

        return true;
    }

    async getAllViews(): Promise<MetaView[]> {
        const metaViewRepository = await this.repositoryService.getTenantRepository(MetaView);
        return await metaViewRepository.find();
    }

    async getView(viewName: string): Promise<MetaView> {
        try {
            const metaViewRepository = await this.repositoryService.getTenantRepository(MetaView);
            const view = await metaViewRepository.findOneOrFail({
                where: {
                    name: viewName,
                },
                select: ['definition'],
            });

            return view.definition;
        } catch (ex) {
            //TODO: @michaelsogos -> send error to logging system
            throw new Error(`View [${viewName}] not found!`);
        }
    }
}
