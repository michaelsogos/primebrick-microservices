import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { User } from './User.entity';
import { MetaMenuItem } from '../../MetaDataManager/entities/MetaMenuItem.entity';

@RegisterEntity('core')
@Entity()
export class Role extends AudibleEntity {
    @Column({ unique: true })
    name: string;

    @ManyToMany((type) => User, (T) => T.roles)
    users: User[];

    @ManyToMany((type) => MetaMenuItem, (T) => T.roles)
    @JoinTable()
    menuItems: MetaMenuItem[];
}
