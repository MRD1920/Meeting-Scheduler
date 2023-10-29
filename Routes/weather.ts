import express from "express";
import { getWeather } from "../Controllers/weather";
import {weatherRateLimiter} from "../Middleware/RateLimiter"
const router = express.Router();

router.get("/weather", weatherRateLimiter, getWeather);

export default router;
