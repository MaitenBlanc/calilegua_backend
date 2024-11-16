import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        {
            provide: 'APIKEY',
            useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
        },
        {
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { connection, user, password, host, port, name } = configService.mongo;
                const uri = `${connection}://${user}:${password}@${host}:${port}/`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db(name);
                return database;
            },
            inject: [config.KEY, ConfigService],
        }
    ],
    exports: ['APIKEY', 'MONGO'],
})
export class DatabaseModule { }
