import { createLogger, format, transports, Logger } from 'winston';
import { appConfigs } from '../config/app.config';

interface LoggerMeta {[key: string]: string};
const loggers: { [key: string]: Logger } = {};

export const _createLogger = (meta?: LoggerMeta): Logger => {
    const { appName, appVersion, logLevel, nodeEnv } = appConfigs;
    let options = {};
    if (nodeEnv === 'development') {
        options = {...options, format: format.combine(format.colorize(), format.simple())}
    }
    return createLogger({
        defaultMeta: { service_name: appName, version: appVersion, ...meta},
        format: format.combine(
            format.timestamp(),
            format.errors({ stack: true }),
            format.json(),
            format.splat(),
        ),
        level: logLevel,
        transports: [
            new transports.Console(options),
        ],
    });
}

export const getLogger = (opts?: {name?: string; meta?: LoggerMeta}): Logger => {
    const loggerName = opts?.name || 'default';
    const logger = loggers[loggerName];
    if (!!logger) {
        return logger;
    }
    const _logger = _createLogger(opts?.meta);
    loggers[loggerName] = _logger
    return _logger;
}
