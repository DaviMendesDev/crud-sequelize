import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import kn from './app/kernel';
const kernel = kn();
import './app/models/load_models';

import api from './routes/api';
const app: express.Application = express();
const port: number|string = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(kernel.loggerExpress);
app.use(api);

app.listen(port, async () => {
    try {
        if (kernel.connection)
            await kernel.connection.authenticate();
        
        kernel.logger(`Connected to '${kernel.connection?.config.database}'`);
    } catch (error) {
        kernel.logger(`Could not connect to '${kernel.connection?.config.database}', reasons:`);
        kernel.logger(error);
    }

    kernel.logger(`Listen on ${port} port.`);
});