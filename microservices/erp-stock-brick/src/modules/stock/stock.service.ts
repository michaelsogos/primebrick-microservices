import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TenantRepositoryService, MessagePayload, AdvancedLogger } from 'primebrick-sdk';
import { Warehouse, WarehouseLine, WarehouseMove, WarehouseMoveLine } from 'erp-stock';
import { Product } from 'erp-base';
import { TenantAlias } from 'primebrick-sdk/dist/modules/TenantManager/entities/TenantAlias.entity';
import { ProducerBatch } from '@nestjs/microservices/external/kafka-options.interface';

enum QtyType {
    CURRENT,
    INCOMING,
    OUTGOING,
    RESERVED,
}

@Injectable()
export class StockService {
    constructor(private readonly repositoryService: TenantRepositoryService, private readonly logger: AdvancedLogger) {
        logger.setContext('StockService');
    }

    /**
     * Method to increase the qty fields of a warehouseLine.
     * @param warehouseLine
     * @param qty
     * @param type
     */
    async addProductQtyInStock(warehouseLine: WarehouseLine, qty: number, type: QtyType): Promise<WarehouseLine> {
        try {
            switch (type) {
                case QtyType.CURRENT:
                    warehouseLine.currentQty += qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.INCOMING:
                    warehouseLine.incomingQty += qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.OUTGOING:
                    warehouseLine.outgoingQty += qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.RESERVED:
                    warehouseLine.reservedQty += qty;
                    return await this.updateFutureQty(warehouseLine);
                default:
                    throw new NotFoundException(`Qty filed of type ${type} not found in WarehouseLine entity!`);
            }
        } catch (err) {
            this.logger.error(err);
        }
    }

    /**
     * Method to decrease the qty fields of a warehouseLine.
     * @param warehouseLine
     * @param qty
     * @param type
     */
    async removeProductQtyInStock(warehouseLine: WarehouseLine, qty: number, type: QtyType): Promise<WarehouseLine> {
        try {
            switch (type) {
                case QtyType.CURRENT:
                    warehouseLine.currentQty -= qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.INCOMING:
                    warehouseLine.incomingQty -= qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.OUTGOING:
                    warehouseLine.outgoingQty -= qty;
                    return await this.updateFutureQty(warehouseLine);
                case QtyType.RESERVED:
                    warehouseLine.reservedQty -= qty;
                    return await this.updateFutureQty(warehouseLine);
                default:
                    throw new NotFoundException(`Qty filed of type ${type} not found in WarehouseLine entity!`);
            }
            return warehouseLine;
        } catch (err) {
            this.logger.error(err);
        }
    }

    /**
     * Method to recalculate the value of the futureQty in a WarehouseLine
     * @param warehouseLine
     */
    async updateFutureQty(warehouseLine: WarehouseLine): Promise<WarehouseLine> {
        try {
            let futureQty: number = 0;
            futureQty = warehouseLine.currentQty + warehouseLine.incomingQty - warehouseLine.outgoingQty - WarehouseLine.reservedQty;
            warehouseLine.futureQty = futureQty;
            return warehouseLine;
        } catch (err) {
            this.logger.error(err);
        }
    }

    /**
     * Method to get all Warehouse Move Line from a Warehouse Move
     * @param warehouseMove
     */
    async getWarehouseMoveLines(warehouseMove: WarehouseMove): Promise<WarehouseMoveLine[]> {
        const warehouseMoveLineRepo = await this.repositoryService.getTenantRepository(WarehouseMoveLine);
        return warehouseMoveLineRepo.createQueryBuilder('moveLine').where('moveLine.WarehouseMove = :moveId', { moveId: warehouseMove.id }).getMany();
    }

    /**
     * Method to retreive the correct Warehouse Move Line
     * @param warehouse
     * @param product
     */
    async getWarehouoseMoveLine(warehouse: Warehouse, product: Product): Promise<WarehouseLine> {
        try {
            const warehouseLineRepo = await this.repositoryService.getTenantRepository(WarehouseLine);
            return warehouseLineRepo
                .createQueryBuilder('warehouseLine')
                .where('warehouseLine.product = :productId AND warehouseLine.warehouse = :warehouseId', {
                    productId: product.id,
                    warehouseId: warehouse.id,
                })
                .getOneOrFail();
        } catch (err) {
            this.logger.error(err);
        }
    }

}
