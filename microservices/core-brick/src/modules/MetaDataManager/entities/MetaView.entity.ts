import { AudibleEntity } from 'primebrick-sdk/orm';
import { Entity, Column } from 'typeorm';

@Entity()
export class MetaView extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column('json')
    definition: any;
}
