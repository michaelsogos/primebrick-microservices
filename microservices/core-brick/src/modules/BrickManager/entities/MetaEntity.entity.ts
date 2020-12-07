import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AudibleEntity, EntityModule } from 'primebrick-sdk';
import { MetaBrick } from './MetaBrick.entity';

@EntityModule('core')
@Entity()
export class MetaEntity extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @ManyToOne((type) => MetaBrick, (T) => T.entities)
    @JoinColumn()
    brick: MetaBrick;
}
