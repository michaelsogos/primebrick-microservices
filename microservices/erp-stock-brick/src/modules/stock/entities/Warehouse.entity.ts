import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { WarehouseType } from './WarehouseType.entity';
import { WarehouseLine } from './WarehouseLine.entity';
//import { Company, BusinessUnit } from 'erp-base';

@RegisterEntity('erpstock')
@Entity()
export class Warehouse extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    @ManyToOne((type) => WarehouseType)
    @JoinColumn()
    warehouseType: WarehouseType;

    /*@ManyToOne((type) => Company)
    @JoinColumn()
    company: Company;

    @ManyToOne((type) => BusinessUnit)
    @JoinColumn()
    businessUnit: BusinessUnit;*/

    @OneToMany((type) => WarehouseLine, (T) => T.warehouse)
    warehouseLines: WarehouseLine[];
}
