import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return <TypeOrmModuleOptions>{
                    type: 'postgres',
                    database: configService.database.name,
                    username: configService.postgres.user,
                    password: configService.postgres.password,
                    host: configService.postgres.host,
                    port: +configService.database.port,
                    synchronize: false,
                    autoLoadEntities: true
                }
            }
        })
    ],
    providers: [
        {
            provide: 'APIKEY',
            useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, name, password, port } = configService.postgres;
                const client = new Client({
                    user,
                    host,
                    database: name,
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
    exports: ['APIKEY', 'PG', TypeOrmModule],
})
export class DatabaseModule { }
