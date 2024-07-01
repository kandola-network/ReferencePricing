import { CloudProvider, PricingSchemaClass } from './entities/pricing.entity';
import { Model } from 'mongoose';
import { CalculatePricing, ReservationType } from './pricing.interface';

export interface PricingService {
  calculatePrice(data: CalculatePricing): Promise<number>;
}

export class AwsPricingService implements PricingService {
  constructor(public readonly pricingModel: Model<PricingSchemaClass>) {}
  async calculatePrice(data: CalculatePricing): Promise<number> {
    const query = {
      provider: CloudProvider.AWS,
      regionSlug: data.region,
      databaseEngine: data.databaseEngine,
      vcpu: { $gte: data.cpu },
      memory: { $gte: data.memory },
      reservations: data.reservation,
      'offers.reservation': data.reservation,
      deploymentOption: data.deploymentOption,
    };
    if (data.reservation == ReservationType.RESERVED)
      query['offers.duration'] = 1;
    const instance = await this.pricingModel.findOne(query, {
      'offers.$': 1,
      deploymentOption: 1,
      name: 1,
      region: 1,
      sku: 1,
    });
    const storage = await this.pricingModel.findOne({
      provider: CloudProvider.AWS,
      regionSlug: data.region,
      databaseEngine: data.databaseEngine,
      deploymentOption: data.deploymentOption,
      storageMedia: data.storageMedia,
      maxVolumeSize: { $gte: data.storageSize },
    });
    if (
      instance != null &&
      instance?.offers[0]?.pricePerUnit &&
      storage &&
      storage != null
    ) {
      const price = storage.offers[0].pricePerUnit * data.storageSize;
      if (data.reservation == ReservationType.ON_DEMAND)
        return instance.offers[0].pricePerUnit * 730 + price;
      if (data.reservation == ReservationType.RESERVED)
        return instance.offers[0].pricePerUnit / data.duration / 12 + price;
    } else return null;
  }
}
