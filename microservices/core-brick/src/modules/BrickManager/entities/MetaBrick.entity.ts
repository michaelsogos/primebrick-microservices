import { AudibleEntity } from 'primebrick-sdk/orm';
import { Entity, Column, OneToMany } from 'typeorm';
import { MetaEntity } from './MetaEntity.entity';

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

    @OneToMany(() => MetaEntity, (T) => T.brick)
    entities: MetaEntity[];
}
