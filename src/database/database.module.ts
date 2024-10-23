import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
    providers: [
        {
            provide: 'APIKEY',
            useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, password, port } = configService.postgres;
                const client = new Client({
                    user,
                    host,
                    database: dbName,
                    password,
                    port
                })

                client.connect()

                    .then(() => console.log('Connected to PostgreSQL'))
                    .catch(err => console.error('Connection error', err.stack));

                return client;
            },
            inject: [config.KEY]
        }
    ],
    exports: ['APIKEY', 'PG'],
})
export class DatabaseModule { }
