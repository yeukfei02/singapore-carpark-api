import axios from "axios";
import {
  CarParkAvailability,
  CarParkAvailabilityRes,
} from "../interface/car-park-availability";

const rootUrl =
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

export const getCarParkAvailability = async () => {
  let carParkAvailability: CarParkAvailabilityRes[] = [];

  const response = await axios.get(rootUrl, {
    headers: { AccountKey: process.env.AccountKey },
  });
  if (response) {
    const responseData: CarParkAvailability = response.data;
    if (responseData && responseData.value) {
      carParkAvailability = responseData.value.map((item) => {
        const location = item.Location.split(" ");
        const latitude = location[0] ? parseInt(location[0], 10) : 0;
        const longitude = location[1] ? parseInt(location[1], 10) : 0;

        const data = {
          carParkID: item.CarParkID,
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
