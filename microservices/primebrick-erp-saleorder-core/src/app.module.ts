import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrderModule } from './modules/SaleOrder/saleorder.module';
import { CoordinatorConnectionConfig } from './db.config';
import { TenantManagerModule, PrimeBrickModule } from 'primebrick-sdk';

@Module({
  imports: [
    TypeOrmModule.forRoot(CoordinatorConnectionConfig),
    SaleOrderModule,
    TenantManagerModule,
  ],
})
export class AppModule extends PrimeBrickModule {}
