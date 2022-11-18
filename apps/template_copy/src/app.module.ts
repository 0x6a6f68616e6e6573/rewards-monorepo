import { Module } from '@nestjs/common';

import { HeroesModule } from './modules/hero/heroes.module';

@Module({
  imports: [HeroesModule],
})
export class AppModule {}
