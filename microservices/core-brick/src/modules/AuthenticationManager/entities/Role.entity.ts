import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User.entity';
import { MetaMenuItem } from '../../MetaDataManager/entities/MetaMenuItem.entity';
import { AudibleEntity } from 'primebrick-sdk/orm';

@Entity()
export class Role extends AudibleEntity {
    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, (T) => T.roles)
    users: User[];

    @ManyToMany(() => MetaMenuItem, (T) => T.roles)
    @JoinTable()
    menuItems: MetaMenuItem[];
}
