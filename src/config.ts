import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DB_NAME,
            port: process.env.DB_PORT,
        },
        postgres: {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
        },
        apikey: process.env.APIKEY
    };
});