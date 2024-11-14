import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';


dotenv.config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
        path.resolve(__dirname, '..') + '/**/entities/*.ts',
    ],
    migrations: [
        path.resolve(__dirname, '..') + '/database/migrations/*.ts',
    ],
    migrationsTableName: 'migrations',
})