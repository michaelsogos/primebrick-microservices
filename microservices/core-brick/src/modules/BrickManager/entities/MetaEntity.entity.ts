/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { MetaBrick } from './MetaBrick.entity';

@RegisterEntity('core')
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
