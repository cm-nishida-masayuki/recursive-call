import { ScheduledEvent } from "aws-lambda";
import { Context } from "vm";
import {
  CloudWatchEventsClient,
  EnableRuleCommand,
} from "@aws-sdk/client-cloudwatch-events";

export const handler = async (event: ScheduledEvent, context: Context) => {
  console.log("called");

  const client = new CloudWatchEventsClient();
  const command = new EnableRuleCommand({
    Name: "YOUR Event Bridge Schedule Rule Name",
  });

  await client.send(command);
};
