import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { hero } from 'proto';
import { HeroesService } from './heroes.service';
import { RpcInterceptor } from '../../interceptors/rpc.interceptor';
import { AllExceptionsFilter } from '../../filters/exception.filter';

@UseInterceptors(RpcInterceptor)
@UseFilters(AllExceptionsFilter)
@Controller('hero')
export class HeroesController implements OnModuleInit {
  private readonly items: hero.Hero[] = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Doe' },
  ];
  private heroService: hero.HeroService;

  constructor(
    @Inject('HERO_PACKAGE') private readonly client: ClientGrpc,
    private readonly heroesService: HeroesService
  ) {}

  onModuleInit() {
    this.heroService = this.client.getService<hero.HeroService>('HeroService');
  }

  @Get()
  getMany(): Observable<hero.Hero[]> {
    const ids$ = new ReplaySubject<hero.HeroById>();
    ids$.next({ id: '1' });
    ids$.next({ id: '2' });
    ids$.complete();

    const stream = this.heroService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<hero.Hero> {
    return this.heroService.findOne({ id: id });
  }

  @GrpcMethod('HeroService')
  findOne(data: hero.HeroById): Observable<hero.Hero> {
    return this.heroesService.findOne(data);
  }

  @GrpcStreamMethod('HeroService')
  findMany(data$: Observable<hero.HeroById>): Observable<hero.Hero> {
    const hero$ = new Subject<hero.Hero>();

    const onNext = (heroById: hero.HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
