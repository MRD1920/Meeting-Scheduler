import express from "express";
import { gptSummary } from "../Controllers/openAi.js";

const router = express.Router();

router.post("/getSummary", gptSummary);

export default router;
