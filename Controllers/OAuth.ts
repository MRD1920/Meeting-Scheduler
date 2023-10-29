import express, { Request, Response } from "express";
import { google, calendar_v3 } from "googleapis";
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

export const googleLogin = async (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
};

export const redirect = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const scope = req.query.scope as string;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.cookie("auth_token", tokens.access_token);
  res.status(200).send("You are logged in");
};

export const scheduleEventGoogleCalendar = async (req: Request, res: Response) => {
  const body = req.body as Record<string, any>;
  let googleCalendarResponse : string = "";
  let errMsg : string = "";
  //console.log("This is inside google event and the following data is body data");
  //console.log(body);
  try {
    calendar.events.insert(
      {
      calendarId: "primary",
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: req.body.Title,
        start: {
          dateTime: dayjs(`${req.body.Date} ${req.body.Time}`).toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dayjs(`${req.body.Date} ${req.body.Time}`)
            .add(1, "hour")
            .toISOString(),
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [
          {
            email: "mrigankadhar_ug@ee.nits.ac.in",
          },
        ],
      },
    },
    (err:any,event:any) => {
      //console.log({event});
      //console.log({err});
      if (err) {
        errMsg = "There was an error contacting the Calendar service: " + err
        //console.log(errMsg);
        throw new Error("hello");
      }
      //console.log("Event created: %s", event?.data?.htmlLink);
      googleCalendarResponse = "Event created " + event?.data?.htmlLink;
      res.status(200).send(googleCalendarResponse);
    }
  );
    
  } catch (error) {
    res.status(400).send("Event couldn't be scheduled");
    
  }
  

};

export default router;
