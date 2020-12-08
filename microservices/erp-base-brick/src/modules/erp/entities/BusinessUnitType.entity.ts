import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { BusinessUnit } from './BusinessUnit.entity';

@RegisterEntity('erpbase')
@Entity()
@Unique(['name', 'value'])
export class BusinessUnitType extends AudibleEntity {
    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    value: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany((type) => BusinessUnit, (T) => T.businessUnitType)
    businessUnits: BusinessUnit[];
}
