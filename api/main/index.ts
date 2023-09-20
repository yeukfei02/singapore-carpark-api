import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  response.status(200).json({
    message: "car-park-availability",
  });
}
