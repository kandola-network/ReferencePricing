import { Injectable, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PricingSchemaClass } from './entities/pricing.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetPricingDto, ReservationType } from './dto/get-pricing.dto';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(PricingSchemaClass.name)
    private readonly pricingModel: Model<PricingSchemaClass>,
  ) {}
  // private paymentGateways: Record<string, PaymentGateway> = {};
  //   export abstract class PaymentGateway {
  //   abstract processPayment(order: Order): void;
  // }
  //   public registerPaymentGateway(
  //     paymentMethod: PAYMENT_METHOD,
  //     gateway: PaymentGateway,
  //   ) {
  //     this.paymentGateways[paymentMethod] = gateway;
  //   }

  async findOne(body: GetPricingDto) {
    const query = {
      provider: 'aws',
      regionSlug: body.region,
      databaseEngine: body.databaseEngine,
      vcpu: { $gte: body.cpu },
      memory: { $gte: body.memory },
      reservations: body.reservation,
      'offers.reservation': body.reservation,
      deploymentOption: body.deploymentOption,
    };
    if (body.reservation == ReservationType.RESERVED)
      query['offers.duration'] = 1;
    const instance = await this.pricingModel.findOne(query, {
      'offers.$': 1,
      deploymentOption: 1,
      name: 1,
      region: 1,
      sku: 1,
    });
    const storage = await this.pricingModel.findOne({
      provider: 'aws',
      regionSlug: body.region,
      databaseEngine: body.databaseEngine,
      reservations: body.reservation,
      deploymentOption: body.deploymentOption,
      minVolumeSize: { $gte: body.storageSize },
      maxVolumeSize: { $lte: body.storageSize },
      storageMedia: body.storageMedia,
    });
    console.log(storage);
    console.log(instance);
    return {
      AWS: instance.offers[0].pricePerUnit,
    };
  }
}
