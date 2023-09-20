import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

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
  carParkId: number;
  area: Area;
  development: string;
  latitude: number;
  longitude: number;
  availableLots: number;
  lotType: LotType;
  agency: Agency;
}

const rootUrl =
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const carParkAvailability = await getCarParkAvailability();

  response.status(200).json({
    message: "car-park-availability",
    carParkAvailability: carParkAvailability,
  });
}

const getCarParkAvailability = async () => {
  let carParkAvailability: CarParkAvailabilityRes[] = [];

  const response = await axios.get(rootUrl, {
    headers: { AccountKey: process.env.ACCOUNT_KEY },
  });
  if (response) {
    const responseData: CarParkAvailability = response.data;
    if (responseData && responseData.value) {
      carParkAvailability = responseData.value.map((item) => {
        const location = item.Location.split(" ");
        const latitude = location[0] ? parseFloat(location[0]) : 0;
        const longitude = location[1] ? parseFloat(location[1]) : 0;

        const data = {
          carParkId: parseInt(item.CarParkID, 10),
          area: item.Area,
          development: item.Development,
          latitude: latitude,
          longitude: longitude,
          availableLots: item.AvailableLots,
          lotType: item.LotType,
          agency: item.Agency,
        };
        return data;
      });
    }
  }

  return carParkAvailability;
};
