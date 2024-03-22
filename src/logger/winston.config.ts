import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

// Create transports instance
const transports: winston.LoggerOptions['transports'] = [
  new winston.transports.Console(),
];

// Create and export the logger instance
export const loggerConfig: WinstonModuleOptions = {
  level: 'info',
  format: winston.format.json(),
  transports,
};
