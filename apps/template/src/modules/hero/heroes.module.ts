import { ClientsModule } from '@nestjs/microservices';

import { grpcClientOptions } from '../../grpc-client.options';

import { Module } from '@nestjs/common';

import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { Hero } from '../../models/hero.model';
// import { CommentsServiceImpl } from './comments.service';
// import { CommentsSeeder } from './comments.seeder';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [HeroesController],
  providers: [
    // CommentsSeeder,
    HeroesService,
    { provide: 'HeroRepository', useValue: Hero },
  ],
})
export class HeroesModule {}
