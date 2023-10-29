import { Request, Response } from "express";
import express from "express"
import axios from "axios";
import querystring from "querystring";

import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const params: { [key: string]: string } = {};

export const getWeather = async (req: Request, res: Response) => {
  const longitude = req.query.longitude as string;
  if (!longitude) {
    res.status(400).send("Please Enter longitude");
    return;
  }
  const latitude = req.query.latitude as string; 
  if (!latitude) {
    res.status(400).send("Please Enter Latitude");
    return;
  }
  params.longitude = longitude;
  params.latitude = latitude;
  params.hourly = "temperature_2m";

  const queryString = querystring.stringify(params);
  const finalURL = `${process.env.WEATHER_URL}?${queryString}`;

  let weatherData;
  try {
    weatherData = await axios.get(finalURL);
  } catch (error) {
    console.log("Error fetching weather data", error);
    res.status(404).send("Error fetching weather data");
    return;
  }

  let result;
  try {
    result = await axios.post("http://localhost:5000/openai/getSummary", {
      Time: weatherData.data.hourly.time,
      Temperature: weatherData.data.hourly.temperature_2m,
    });
  } catch (error) {
    console.log("Error fetching summary\n", error);
    res.status(404).send("Error fetching summary");
    return;
  }

  let final;
  try {
    final = await axios.post(
      "http://localhost:5000/login/scheduleGoogleEvent",
      result.data
    );
  } catch (error) {
    console.log("Error occurred at the final step", error);
    res.status(400).send("Error occurred at the final step");
    return;
  }
  console.log("this is google calendar response to weather api \n",final.data);

  res.status(200).send(final.data);
};

export default router;
