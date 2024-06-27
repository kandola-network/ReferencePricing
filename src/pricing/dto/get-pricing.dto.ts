import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  ValidateIf,
} from 'class-validator';

export enum ReservationType {
  ON_DEMAND = 'OnDemand',
  RESERVED = 'Reserved',
}
export enum DatabaseEngine {
  MYSQL = 'MySQL',
  POSTGRES = 'PostgreSQL',
}
export enum RegionSlug {
  aws_govcloud_us_east = 'aws-govcloud-us-east',
  aws_govcloud_us_west = 'aws-govcloud-us-west',
  africa_cape_town = 'africa-cape-town',
  asia_pacific_hong_kong = 'asia-pacific-hong-kong',
  asia_pacific_mumbai = 'asia-pacific-mumbai',
}
export enum DeploymentOption {
  SINGLE_AZ = 'Single-AZ',
  MULTI_AZ = 'Multi-AZ',
}
export enum storageMedia {
  Magnetic = 'Magnetic',
  SSD = 'SSD',
}
export class GetPricingDto {
  @IsEnum(RegionSlug)
  region: RegionSlug;
  @IsNumber()
  cpu: number;
  @IsNumber()
  memory: number;
  @IsEnum(DatabaseEngine)
  databaseEngine: DatabaseEngine;
  @IsEnum(ReservationType)
  reservation: ReservationType;
  @IsEnum(DeploymentOption)
  deploymentOption: DeploymentOption;
  @IsPositive()
  @IsInt()
  @ValidateIf((o) => o.reservation === ReservationType.RESERVED)
  duration?: number;
  @IsEnum(storageMedia)
  storageMedia?: storageMedia;
  @IsPositive()
  @IsInt()
  storageSize?: number;
}
