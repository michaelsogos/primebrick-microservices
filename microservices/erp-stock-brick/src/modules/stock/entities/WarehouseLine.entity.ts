import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Warehouse } from './Warehouse.entity';
//import { Product } from 'erp-base';

@RegisterEntity('erpstock')
@Entity()
export class WarehouseLine extends AudibleEntity {

    @Column({nullable: false})
    currentQty: number;

    @Column({nullable: false})
    outgoingQty: number;

    @Column({nullable: false})
    incomingQty: number;

    @Column({nullable: false})
    reservedQty: number;

    @ManyToOne((type) => Warehouse)
    @JoinColumn()
    warehouse: Warehouse;

   /* @ManyToOne((type) => Product)
    @JoinColumn()
    product: Product;*/
}
