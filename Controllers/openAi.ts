import { Request, Response } from "express";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

let message: ChatCompletionMessageParam = { role: "user" ,content:""};
let messages: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content:
      "You will be provided with a list of time followed by temperature and your task is to give the best time along with the temperature for a meeting along with a suitable meeting title (different/unique every time) based on the weather and full of energy in JSON format as follows: { Date: 'BEST_DATE', Time: 'BEST_TIME', Temperature: 'BEST_TEMPERATURE', Title: 'MEET_TITLE' }",
  },
];

export const gptSummary = async (req: Request, res: Response) => {
  const incomingMessage = req.body;
  if (incomingMessage) console.log("Message body received");

  message.content = JSON.stringify(incomingMessage);
  messages.push(message);

  let response: any; // Define a type for the response

  try {
    response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      max_tokens: 1024,
    });
    messages.pop();
  } catch (error) {
    console.log("Error getting chat GPT response", error);
    res.status(404).send("Error getting chat GPT response");
    return; // Exit the function on error
  }

  res.status(200).send(response.choices[0].message.content);
};

export default gptSummary;
