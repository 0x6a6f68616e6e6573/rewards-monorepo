import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

const defaultOptions: SequelizeModuleOptions = {
  dialect: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'template',
  autoLoadModels: true,
  synchronize: true,
};

@Module({
  imports: [],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');
  }

  static forRoot(params?: SequelizeModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        SequelizeModule.forRoot({
          ...defaultOptions,
          host: 'localhost',
          ...params,
        }),
      ],
    };
  }
}
