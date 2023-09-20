export interface CarParkAvailability {
  "odata.metadata": string;
  value: Value[];
}

export interface Value {
  CarParkID: string;
  Area: Area;
  Development: string;
  Location: string;
  AvailableLots: number;
  LotType: LotType;
  Agency: Agency;
}

export enum Agency {
  Hdb = "HDB",
  Lta = "LTA",
  Ura = "URA",
}

export enum Area {
  Empty = "",
  Harbfront = "Harbfront",
  JurongLakeDistrict = "JurongLakeDistrict",
  Marina = "Marina",
  Orchard = "Orchard",
  Others = "Others",
}

export enum LotType {
  C = "C",
  H = "H",
  Y = "Y",
}

export interface CarParkAvailabilityRes {
  carParkId: string;
  area: Area;
  development: string;
  latitude: number;
  longitude: number;
  availableLots: number;
  lotType: LotType;
  agency: Agency;
}
