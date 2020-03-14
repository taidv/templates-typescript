import { getLogger } from "./logger";

const logger = getLogger();

export const hello = () => {
  const name = process.argv.slice(2).join(' ') || 'world';
  logger.info(`Hello, ${name}!`);
};

hello();
