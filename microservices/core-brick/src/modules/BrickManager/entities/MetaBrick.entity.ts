/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { MetaEntity } from './MetaEntity.entity';

@RegisterEntity('core')
@Entity()
export class MetaBrick extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    module: string; //TODO: @mso -> change it in name

    @Column({
        nullable: false,
    })
    description: string;

    @Column({
        nullable: false,
    })
    brickVersion: string;

    @Column({
        nullable: false,
    })
    autoInstall: boolean;

    @OneToMany((type) => MetaEntity, (T) => T.brick)
    entities: MetaEntity[];
}
