import { Entity, Column } from 'typeorm';
import { AudibleEntity } from 'primebrick-sdk';

@Entity('saleorder_saleorder')
export class SaleOrder extends AudibleEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  definition: string;
}
