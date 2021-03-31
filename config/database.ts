import { Options } from 'sequelize'

const dbInfo: Options = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    dialect: 'postgres',
    database: process.env.DB_NAME || 'postgres',
};

export default dbInfo;