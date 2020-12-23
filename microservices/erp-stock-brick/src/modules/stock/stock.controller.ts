import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {  MessagePayload } from 'primebrick-sdk';
import { StockService } from './stock.service';

@Controller()
export class StockController {
    constructor(private readonly erpService: StockService) {}

   
}
