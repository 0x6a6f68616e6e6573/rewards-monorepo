import { Metadata } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { mergeMap, Observable } from 'rxjs';

import { hero } from 'proto';
import { Hero } from '../../models/hero.model';

@Injectable()
export class HeroesService implements hero.HeroService {
  constructor(
    @InjectModel(Hero)
    private heroModel: typeof Hero
  ) {}

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

  findOne(
    data: hero.HeroById,
    _metadata?: Metadata,
    ..._rest: any[]
  ): Observable<hero.Hero> {
    return this.handle(this.heroModel.findOne({ where: { data } }));
  }

  findMany(
    data: Observable<hero.HeroById>,
    _metadata?: Metadata,
    ..._rest: any[]
  ): Observable<hero.Hero> {
    return data.pipe(
      mergeMap((input) => {
        return this.findOne(input);
      })
    );
  }
}
