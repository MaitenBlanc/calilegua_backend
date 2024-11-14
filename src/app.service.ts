import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  private APIKEY: string;
  private DB_NAME: string;

  constructor(
    private config: ConfigService,
    @Inject('TAREA_ASINC') private tarea: any[],
    @Inject('PG') private clientPg: Client,
  ) {
    this.APIKEY = this.config.get<string>('config.apikey');
    this.DB_NAME = this.config.get<string>('config.database.name');
  }

  getKey(): string {
    console.log('Entorno actual: ' + process.env.NODE_ENV);
    return `Llave de la aplicación: ${this.APIKEY} y nombre de la base de datos: ${this.DB_NAME}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'Realizando una tarea asincrona de ejemplo';
  }

  getTareas() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    })
  }
}
