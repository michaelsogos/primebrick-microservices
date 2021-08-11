import { AudibleEntity } from 'primebrick-sdk/orm';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MetaBrick } from './MetaBrick.entity';

@Entity()
export class MetaEntity extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @ManyToOne(() => MetaBrick, (T) => T.entities)
    @JoinColumn()
    brick: MetaBrick;
}
