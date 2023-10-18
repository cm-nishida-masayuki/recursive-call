import { Event } from "aws-cdk-lib/aws-stepfunctions-tasks";

const getRandomElement = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const handler = async (event: Event) => {
  const status = getRandomElement([
    "SUCCESS",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "PROCESSING",
    "FAILED",
  ]);

  console.log(`status: ${status}`);

  return [
    {
      status,
      body: event,
    },
  ];
};
