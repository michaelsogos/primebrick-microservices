import { Entity, Column } from 'typeorm';
import { AudibleEntity, EntityModule } from 'primebrick-sdk';

@EntityModule('core')
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


