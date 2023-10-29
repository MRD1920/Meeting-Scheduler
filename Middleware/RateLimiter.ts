import {rateLimit} from "express-rate-limit"
import express from "express"
//import rateLimiter from "express-rate-limiter"


export const weatherRateLimiter = rateLimit({
    windowMs: 1000 * 60, // 1min window
    max: 5, // max requets per IP per windowMs
    message: "You have reached API rate limit. Please wait for some time.",
});

