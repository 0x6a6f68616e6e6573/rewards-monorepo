import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { HeroesModule } from './modules/hero/heroes.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    HeroesModule,
  ],
})
export class AppModule {}
