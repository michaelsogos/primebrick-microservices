import { Entity, Column } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';

@RegisterEntity('core')
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
