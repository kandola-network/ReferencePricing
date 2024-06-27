import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import {
  DatabaseEngine,
  DeploymentOption,
  RegionSlug,
  ReservationType,
  StorageMedia,
} from '../pricing.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiPropertyOptional({
    type: Number,
    required: false,
    description: 'Duration in years',
  })
  @ValidateIf((o) => o.reservation === ReservationType.RESERVED)
  duration?: number;
  @IsEnum(StorageMedia)
  storageMedia: StorageMedia;
  @IsPositive()
  @IsInt()
  storageSize: number;
}
