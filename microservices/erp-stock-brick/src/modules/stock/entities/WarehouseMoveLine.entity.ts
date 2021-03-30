import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
//import { Product } from 'erp-base';
import { WarehouseMove } from './WarehouseMove.entity';

@RegisterEntity('erpstock')
@Entity()
export class WarehouseMoveLine extends AudibleEntity {

    @Column({nullable: false})
    qty: number;

    @Column({nullable: false})
    checkedQty: number;

    @Column({nullable: false})
    realQty: number;

  /* @ManyToOne((type) => Product)
    @JoinColumn()
    product: Product;*/

    @ManyToOne((type) => WarehouseMove)
    @JoinColumn()
    warehouseMove: WarehouseMove;
}
