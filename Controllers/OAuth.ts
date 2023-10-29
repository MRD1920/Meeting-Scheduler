import express, { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

dotenv.config();

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID as string,
  process.env.CLIENT_SECRET as string,
  process.env.REDIRECT_URL as string
);

const scopes: string[] = ["https://www.googleapis.com/auth/calendar"];

const calendar = google.calendar({
  version: "v3",
  auth: process.env.API_KEY as string,
});

export const googleLogin = (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
};

export const redirect = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.cookie("auth_token", tokens.access_token);
  res.status(200).send("You are logged in");
};

export const scheduleEventGoogleCalendar = async (req: Request, res: Response) => {
  const body = req.body;
  
  try {
    const result:any = await new Promise((resolve, reject) => {
      calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody: {
          summary: body.Title,
          start: {
            dateTime: dayjs(`${body.Date} ${body.Time}`).toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: dayjs(`${body.Date} ${body.Time}`).add(1, "hour").toISOString(),
            timeZone: "Asia/Kolkata",
          },
          conferenceData: {
            createRequest: {
              requestId: uuid(),
            },
          },
          attendees: [{ email: "mrigankadhar_ug@ee.nits.ac.in" }],
        },
      }, (err:any, event:any) => {
        if (err) reject(err);
        resolve(event);
      });
    });

    res.status(200).send(`Event created: ${result.data.htmlLink}`);

  } catch (error:any) {
    console.error("Error scheduling the event:", error.message);
    res.status(400).send("Event couldn't be scheduled");
  }
};

export default router;