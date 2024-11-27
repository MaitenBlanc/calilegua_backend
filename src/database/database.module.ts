import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from 'src/config';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (ConfigService: ConfigType<typeof config>) => {
                // const { connection, user, password, host, port, name } = ConfigService.mongo;
                const { user, password, name, port, host, connection } = ConfigService.mongo;
                return {
                    // uri: `${connection}://${host}:${port}`,
                    uri: `${connection}://${user}:${password}@${host}:${port}/${name}`,
                    user,
                    pass: password,
                    name,
                };
            },
            inject: [config.KEY],
        })
    ],
    providers: [
        {
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { user, password, name, port, host, connection } = configService.mongo;
                const uri = `${connection}://${user}:${password}@${host}:${port}/${name}`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db(name);
                return database;
            },
            inject: [config.KEY, ConfigService],
        }
    ],
    exports: ['MONGO', MongooseModule],
})
export class DatabaseModule { }
