import log4js from '../configs/logConfig.js';

const logger = log4js.getLogger('error');

// Function to log messages with filename, function name, and error message
export const logError = (filename, functionName, message) => {
    const formattedMessage = `[${filename} -> ${functionName}] ${message}`;
    logger.error(formattedMessage);
};


