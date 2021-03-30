import { WarehouseMoveLine } from './WarehouseMoveLine.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
//import { Company, BusinessUnit, Partner } from 'erp-base';
import { Warehouse } from './Warehouse.entity';

enum WarehouseMoveType{
    Incoming = 1,
    Outgoing = 2
}

enum WarehouseMoveStatus {
    DRAFT = 1,
    CONFIRMED = 2,
    CLOSED = 3,
    CANCELLED = 4
}

@RegisterEntity('erpstock')
@Entity()
export class WarehouseMove extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        enum: WarehouseMoveType,
        nullable: false
    })
    warehouseMoveType: WarehouseMoveType

    @Column({
        enum: WarehouseMoveStatus,
        nullable: false
    })
    status: WarehouseMoveStatus

    @Column({
        nullable: false,
    })
    creationDate: Date;

    @Column()
    confirmationDate: Date;

    @Column()
    closingDate: Date;

    @Column()
    cancellingDate: Date;

    /*@ManyToOne((type) => Company)
    @JoinColumn()
    company: Company;

    @ManyToOne((type) => Partner)
    @JoinColumn()
    partner: Partner;

    @ManyToOne((type) => BusinessUnit)
    @JoinColumn()
    targetBusinessUnit: BusinessUnit;*/

    @ManyToOne((type) => Warehouse)
    @JoinColumn()
    targetWarehouse: Warehouse;

    /*@ManyToOne((type) => BusinessUnit)
    @JoinColumn()
    sourceBusinessUnit: BusinessUnit;*/

    @ManyToOne((type) => Warehouse)
    @JoinColumn()
    sourceWarehouse: Warehouse;

    @OneToMany((type) => WarehouseMoveLine, (T) => T.warehouseMove)
    warehouseMoveLines: WarehouseMoveLine[];
}
