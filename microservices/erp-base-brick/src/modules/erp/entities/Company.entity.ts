import { Entity, Column, OneToMany } from 'typeorm';
import { AudibleEntity } from 'primebrick-sdk';
import { BusinessUnit } from './BusinessUnit.entity';

@Entity()
export class Company extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany((type) => BusinessUnit, (T) => T.company)
    businessUnits: BusinessUnit[];
}
