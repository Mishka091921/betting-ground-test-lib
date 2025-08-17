import { Logger } from '@nestjs/common';

const appLogger = new Logger('App');

export const log = {
  info: (msg: string, context = 'App') => appLogger.log(msg, context),
  warn: (msg: string, context = 'App') => appLogger.warn(msg, context),
  error: (msg: string, trace = '', context = 'App') => appLogger.error(msg, trace, context),
  debug: (msg: string, context = 'App') => appLogger.debug?.(msg, context),
  verbose: (msg: string, context = 'App') => appLogger.verbose?.(msg, context),
};
