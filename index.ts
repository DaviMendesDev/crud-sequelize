import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import api from './routes/api';
const app: express.Application = express();
const port = 8000;
const debugLog: debug.IDebugger = debug('app');

dotenv.config();

app.use(express.json());
app.use(cors());

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
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
} else {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
app.use(api);

app.listen(port, () => {
    debugLog(`Listen on ${port} port.`);
});