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
  asia_pacific_tokyo = 'asia-pacific-tokyo',
  asia_pacific_seoul = 'asia-pacific-seoul',
  asia_pacific_osaka = 'asia-pacific-osaka',
  asia_pacific_mumbai = 'asia-pacific-mumbai',
  asia_pacific_singapore = 'asia-pacific-singapore',
  asia_pacific_sydney = 'asia-pacific-sydney',
  asia_pacific_jakarta = 'asia-pacific-jakarta',
  canada_central = 'canada-central',
  europe_frankfurt = 'europe-frankfurt',
  europe_stockholm = 'europe-stockholm',
  europe_milan = 'europe-milan',
  europe_ireland = 'europe-ireland',
  europe_london = 'europe-london',
  europe_paris = 'europe-paris',
  middle_east_bahrain = 'middle-east-bahrain',
  south_america_sao_paulo = 'south-america-sao-paulo',
  us_east_n_virginia = 'us-east-n-virginia',
  us_east_ohio = 'us-east-ohio',
  us_west_n_california = 'us-west-n-california',
  us_west_oregon = 'us-west-oregon',
  us_west_los_angeles = 'us-west-los-angeles',
  asia_pacific_hyderabad = 'asia-pacific-hyderabad',
  europe_zurich = 'europe-zurich',
  europe_spain = 'europe-spain',
  middle_east_uae = 'middle-east-uae',
  asia_pacific_osaka_local = 'asia-pacific-osaka-local',
}
export enum DeploymentOption {
  SINGLE_AZ = 'Single-AZ',
  MULTI_AZ = 'Multi-AZ',
}
export enum StorageMedia {
  Magnetic = 'Magnetic',
  SSD = 'SSD',
}

export interface CalculatePricing {
  region: RegionSlug;
  cpu: number;
  memory: number;
  databaseEngine: DatabaseEngine;
  reservation: ReservationType;
  deploymentOption: DeploymentOption;
  duration?: number;
  storageMedia: StorageMedia;
  storageSize: number;
}
