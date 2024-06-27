import { Controller, Post, Body } from '@nestjs/common';
import { AwsPricingService, PricingService } from './pricing.service';
import { GetPricingDto } from './dto/get-pricing.dto';
import { CloudProvider, PricingSchemaClass } from './entities/pricing.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('pricing')
export class PricingController {
  private pricingService: Record<string, PricingService> = {};

  constructor(
    @InjectModel(PricingSchemaClass.name)
    public readonly pricingModel: Model<PricingSchemaClass>,
  ) {
    this.pricingService[CloudProvider.AWS] = new AwsPricingService(
      pricingModel,
    );
  }

  @Post()
  async getPrice(@Body() body: GetPricingDto) {
    const data = {
      AWS: await this.pricingService[CloudProvider.AWS].calculatePrice(body),
    };
    return data;
  }
}
