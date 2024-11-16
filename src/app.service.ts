import { Get, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) { }

  getTasks() {
    const tasksCollection = this.database.collection('tareas');
    return tasksCollection.find().toArray();
  }
}
