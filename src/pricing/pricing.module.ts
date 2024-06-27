import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
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
  providers: [PricingService],
})
export class PricingModule {}
