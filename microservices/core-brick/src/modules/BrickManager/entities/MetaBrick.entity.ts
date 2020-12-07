import { Entity, Column, OneToMany } from 'typeorm';
import { AudibleEntity, EntityModule } from 'primebrick-sdk';
import { MetaEntity } from './MetaEntity.entity';

@EntityModule('core')
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
    module: string;

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
