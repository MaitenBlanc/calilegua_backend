import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';


dotenv.config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('TYPEORM_HOST'),
    port: parseInt(configService.get('TYPEORM_PORT')),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [
        path.resolve(__dirname, '..') + '/**/entities/*.ts',
    ],
    migrations: [
        path.resolve(__dirname, '..') + '/database/migrations/*.ts',
    ],
    migrationsTableName: 'migrations',
})