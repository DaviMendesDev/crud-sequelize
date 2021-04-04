import { Sequelize } from 'sequelize';
import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import dbInfo from '../config/database';

let connection: Sequelize;
let logger: debug.Debugger;

interface KernelInfo {
    connection?: Sequelize,
    logger: debug.Debugger,
    loggerExpress: express.Handler
}

function kernel (): KernelInfo {
    logger = debug('app');

    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true })
        ),
    };
    
    if (process.env.DEBUG) {
        process.on('unhandledRejection', function(reason) {
            logger?.call(logger, ['Unhandled Rejection:', reason]);
            process.exit(1);
        });
    } else {
        loggerOptions.meta = false;
    }

    connection = new Sequelize({
        ...dbInfo,
        logging: logger
    });

    return {
        connection: connection,
        logger: logger,
        loggerExpress: expressWinston.logger(loggerOptions)
    }
}

export default kernel;
export { connection, logger };
