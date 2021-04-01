import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import kernel from './app/kernel';
const kernelInfo = kernel();
import './app/models/load_models';

import api from './routes/api';
const app: express.Application = express();
const port: number|string = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(kernelInfo.loggerExpress);
app.use(api);

app.listen(port, async () => {
    try {
        if (kernelInfo.connection)
            await kernelInfo.connection.authenticate();
        
        kernelInfo.logger(`Connected to '${kernelInfo.connection?.config.database}'`);
    } catch (error) {
        kernelInfo.logger(`Could not connect to '${kernelInfo.connection?.config.database}', reasons:`);
        kernelInfo.logger(error);
    }

    kernelInfo.logger(`Listen on ${port} port.`);
});