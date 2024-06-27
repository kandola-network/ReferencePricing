import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PricingSchema, PricingSchemaClass } from './entities/pricing.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: PricingSchemaClass.name, schema: PricingSchema },
    ]),
  ],
  controllers: [PricingController],
})
export class PricingModule {}
