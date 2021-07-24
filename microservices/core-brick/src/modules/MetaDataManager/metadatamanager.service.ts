import { Injectable } from '@nestjs/common';
import { SessionManagerService, TenantRepositoryService, ViewDefinition } from 'primebrick-sdk';
import { Brackets, In } from 'typeorm';
import { Role } from '../AuthenticationManager/entities/Role.entity';
import { MetaMenuItem } from './entities/MetaMenuItem.entity';
import { MetaTranslation } from './entities/MetaTranslation.entity';
import { MetaView } from './entities/MetaView.entity';
import { MenuItemResponse } from './models/MenuItemResponse';

@Injectable()
export class MetadataManagerService {
    constructor(private readonly repositoryService: TenantRepositoryService, private readonly sessionManagerService: SessionManagerService) {}

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

    async getTranslations(group: string, languageCode?: string): Promise<MetaTranslation[]> {
        const translationRepository = await this.repositoryService.getTenantRepository(MetaTranslation);
        const query = translationRepository.createQueryBuilder('t');

        if (!languageCode) {
            const sessionContext = this.sessionManagerService.getContext();
            languageCode = sessionContext.languageCode;
        }

        if (group) query.where('t.group = :group', { group: group });
        else {
            query.where(
                new Brackets((qb) => {
                    qb.where('t.group is null');
                    qb.orWhere('t.group = :group', { group: '' });
                }),
            );
        }
        query.andWhere('t.languageCode = :languageCode', { languageCode });

        query.select(['t.isTemplate', 't.key', 't.value']);

        const translations = await query.getMany();

        return translations;
    }

    async getAllMenuItems(): Promise<MetaMenuItem[]> {
        const metaMenuRepository = await this.repositoryService.getTenantRepository(MetaMenuItem);
        const treeRepostory = metaMenuRepository.manager.getTreeRepository(MetaMenuItem);
        return await treeRepostory.findTrees();
    }

    async getMenuItems(): Promise<MenuItemResponse[]> {
        const roleRepository = await this.repositoryService.getTenantRepository(Role);
        const sessionContext = this.sessionManagerService.getContext();
        const roles = await roleRepository.find({
            relations: ['menuItems'],
            where: {
                name: In([...sessionContext.userProfile.roles]),
            },
        });

        const metaMenuRepository = await this.repositoryService.getTenantRepository(MetaMenuItem);
        //TODO: @mso -> This query can return duplicated results cause if a user have many roles which are linked to same root menu,
        //then we will receive same menu items (and descendants tree) more times
        //Suggestion: try to make a @ViewEntity with a custom and efficent query to retrieve distinct menu items
        //To continue use tree repository logic (that's amazing feature), the @ViewEntity should retrieve just a flat list of ROOT MENU ITEM only
        //the tree repository will do the rest.

        const treeRepostory = metaMenuRepository.manager.getTreeRepository(MetaMenuItem);

        const result: MenuItemResponse[] = [];
        for (const role of roles) {
            for (const menu of role.menuItems) {
                menu.children = await treeRepostory
                    .createDescendantsQueryBuilder('mi', 'mic', menu)
                    .select(['mi.labelKey', 'mi.icon', 'mi.color', 'mi.viewName', 'mi.orderPriority', 'mic'])
                    .getMany();
                result.push({
                    labelKey: menu.labelKey,
                    icon: menu.icon,
                    color: menu.color,
                    viewName: menu.viewName,
                    orderPriority: menu.orderPriority,
                    children: menu.children,
                });
            }
        }

        return result;
    }
}
