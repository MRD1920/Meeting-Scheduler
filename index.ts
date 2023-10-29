import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import login from "./Routes/OAuth";
import summary from "./Routes/openAi";
import weather from "./Routes/weather";
//import login from "./Routes/"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

//app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
const PORT = process.env.PORT || 3000;

app.use("/login", login);
app.use("/openai", summary);
app.use("/location", weather);

app.listen(PORT, () => {
  console.log("Server is Live on PORT: ", PORT);
});

