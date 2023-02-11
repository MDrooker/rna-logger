import FunctionLogger from './lib/function-logger.js';
import AppLogger from './lib/app-logger.js';
import debugModule from 'debug';

const getLogger = () => {
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.FUNCTION_NAME) {
        // Lambda environment - don't use Winston
        // GCP Function environment - don't use Winston
        return new FunctionLogger();
    } else {
        // app environment - use Winston
        const consoleLogLevel = process.env.CONSOLE_LOG_LEVEL || 'silly';
        const logger = new AppLogger({
            level: consoleLogLevel,
            colorize: process.env.CONSOLE_LOG_UNCOLORIZED !== 'true',
            json: true
        });
        return logger;
    }
};


const logger = getLogger();
export default logger;
export { debugModule }
export { logger }
