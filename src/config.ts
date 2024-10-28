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
        mysql: {
            host: process.env.MYSQL_HOST,
            name: process.env.MYSQL_DB,
            port: parseInt(process.env.MYSQL_PORT, 10),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        },
        apikey: process.env.APIKEY
    };
});