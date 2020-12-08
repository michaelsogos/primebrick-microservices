import { Entity, Column, Unique } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';

@RegisterEntity('core')
@Entity()
@Unique(['key', 'languageCode'])
export class MetaTranslation extends AudibleEntity {
    @Column({
        nullable: false,
    })
    key: string;

    @Column({
        nullable: false,
    })
    languageCode: string;

    @Column({
        nullable: false,
    })
    value: string;

    @Column({ default: false })
    isTemplate: boolean;

    @Column({
        nullable: true,
    })
    group: string;
}
