export abstract class PricingGateway {
  abstract calculatePrice(test: any): void;
}

enum Provider {
  AWS = 'aws',
  GCP = 'gcp',
  AZURE = 'azure',
}
enum Type {
  ON_DEMAND = 'on_demand',
  RESERVED = 'reserved',
  SPOT = 'spot',
}

class Schema {
  region: string;
  sku: string;
  price: number; // in hourly
  databaseType: string;
  cpu: number;
  memory: number; // in GB
  type: Type;
  provider: Provider;
  currencyCode: string;
  usageType: string;
}
