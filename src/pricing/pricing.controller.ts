import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { GetPricingDto } from './dto/get-pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  findOne(@Body() body: GetPricingDto) {
    return this.pricingService.findOne(body);
  }
}
