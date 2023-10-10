const getRandomElement = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const handler = async () => {
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

  return {
    status,
  };
};
