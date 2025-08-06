import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon, start, end } = req.query;
  
  try {
    const response = await axios.get(`https://archive-api.open-meteo.com/v1/archive`, {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: start,
        end_date: end,
        hourly: "temperature_2m",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
