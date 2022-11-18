import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './modules/database/database.module';
import { HeroesModule } from './modules/hero/heroes.module';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    DatabaseModule,
    HeroesModule,
  ],
})
export class AppModule {}
