import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Warehouse } from './Warehouse.entity';

@RegisterEntity('erpstock')
@Entity()
export class WarehouseType extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    @OneToMany((type) => Warehouse, (T) => T.warehouseType)
    warehouses: Warehouse[];
}
