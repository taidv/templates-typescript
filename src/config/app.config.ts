
export const appConfigs = {
    appName: process.env.APP_NAME || process.env.npm_package_name,
    appVersion: process.env.APP_VERSION || process.env.npm_package_version,
    logLevel: process.env.LOG_LEVEL || 'debug',
    nodeEnv: process.env.NODE_ENV || 'development',
};
