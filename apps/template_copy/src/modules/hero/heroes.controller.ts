import {
  Controller,
  OnModuleInit,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

import { hero } from 'proto';
import { HeroesService } from './heroes.service';
import { RpcInterceptor } from '../../interceptors/rpc.interceptor';
import { AllExceptionsFilter } from '../../filters/exception.filter';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';

@UseInterceptors(RpcInterceptor)
@UseFilters(AllExceptionsFilter)
@Controller('hero')
export class HeroesController implements OnModuleInit {
  private readonly items: hero.Hero[] = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Doe' },
  ];

  constructor(private readonly heroesService: HeroesService) {}

  onModuleInit() {
    //
  }

  @GrpcMethod('HeroService')
  findOne(data: hero.HeroById): Observable<hero.Hero> {
    return this.heroesService.findOne(data);
  }

  @GrpcStreamMethod('HeroService')
  findMany(data$: Observable<hero.HeroById>): Observable<hero.Hero> {
    return this.heroesService.findMany(data$);
  }
}
