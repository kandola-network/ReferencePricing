import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationType } from '../pricing.interface';
export enum CloudProvider {
  AWS = 'aws',
  GCP = 'gcp',
  AZURE = 'azure',
}
export enum DeploymentOption {
  SINGLE_AZ = 'Single-AZ',
  MULTI_AZ = 'Multi-AZ',
}
@Schema({ _id: false, versionKey: false })
class OfferSchemaClass {
  @Prop({ type: String })
  reservation: ReservationType;
  @Prop({ type: String })
  unit: string; // Quantity or Hrs
  @Prop({ type: Number })
  duration: number; // in years
  @Prop({ type: Number })
  pricePerUnit: number; // in hourly or upfront based on unit
}
@Schema({ collection: 'pricing', versionKey: false })
export class PricingSchemaClass {
  @Prop({ type: String })
  region: string;
  @Prop({ type: String })
  regionSlug: string;
  @Prop({ type: String })
  sku: string;
  @Prop({ type: String })
  databaseEngine?: string;
  @Prop({ type: String })
  productFamily: string;
  @Prop({ type: Number })
  vcpu: number;
  @Prop({ type: Number })
  memory: number; // in GB
  @Prop({ type: [String], enum: ReservationType })
  reservations: ReservationType[];
  @Prop({ type: String, enum: CloudProvider })
  provider: CloudProvider;
  @Prop({ type: String, enum: DeploymentOption })
  deploymentOption: DeploymentOption;
  @Prop({ type: [OfferSchemaClass] })
  offers: OfferSchemaClass[];
  @Prop({ type: Number })
  minVolumeSize: number;
  @Prop({ type: Number })
  maxVolumeSize: number;
  @Prop({ type: String })
  storageMedia: string;
}
export const PricingSchema = SchemaFactory.createForClass(PricingSchemaClass);
PricingSchema.index({
  provider: 1,
  regionSlug: 1,
  reservations: 1,
  deploymentOption: 1,
  databaseEngine: 1,
  vcpu: 1,
  memory: 1,
});
PricingSchema.index({
  provider: 1,
  regionSlug: 1,
  databaseEngine: 1,
  deploymentOption: 1,
  storageMedia: 1,
  minVolumeSize: 1,
  maxVolumeSize: 1,
});
