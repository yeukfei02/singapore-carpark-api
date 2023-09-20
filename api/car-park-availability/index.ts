import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCarParkAvailability } from "../../request/car-park-availability";

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
