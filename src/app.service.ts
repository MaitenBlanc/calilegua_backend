import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APIKEY') private APIKEY: string,
    @Inject('TAREA_ASINC') private tarea: any
  ) { }

  getKey(): string {
    return this.APIKEY;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'Realizanod una tarea asincrona de ejemplo';
  }
}
