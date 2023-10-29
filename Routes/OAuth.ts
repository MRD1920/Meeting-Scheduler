import express from "express";
import {
  googleLogin,
  redirect,
  scheduleEventGoogleCalendar,
} from "../Controllers/OAuth";

const router = express.Router();

router.get("/OAuthLogin", googleLogin);
router.get("/redirect", redirect);
router.post("/scheduleGoogleEvent", scheduleEventGoogleCalendar);

export default router;
