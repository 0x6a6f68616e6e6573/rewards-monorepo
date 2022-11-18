import { Metadata } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { hero } from 'proto';

@Injectable()
export class HeroesService implements hero.HeroService {
  constructor() {
    //
  }
  findOne(
    data: hero.HeroById,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<hero.Hero> {
    // throw new Error('Method not implemented.');
    return new Observable((sub) => {
      sub.next({ id: '10', name: 'jo' });
      sub.complete();
    });
  }
  findMany(
    data: Observable<hero.HeroById>,
    metadata?: Metadata,
    ...rest: any[]
  ): Observable<hero.Hero> {
    throw new Error('Method not implemented.');
  }

  handle<Result>(promise: Promise<any>): Observable<Result> {
    return new Observable((subscriber) => {
      promise
        .then((response) => {
          subscriber.next(response);
        })
        .catch((err) => {
          // Handle Postgres Error (not found...)
          // subscriber.error(err);
          subscriber.next(null);
        })
        .finally(() => subscriber.complete());
    });
  }
}
