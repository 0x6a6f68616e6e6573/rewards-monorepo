import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { PinoLogger } from 'nestjs-pino';
import { Model } from 'sequelize';

const models: any[] = [];

export function add(model: Model) {
  models.push(model);
}

export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (logger: PinoLogger) => {
    logger.setContext('Sequelize');

    const db: Sequelize = new Sequelize('template', 'postgres', 'root', {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      logging: logger.info.bind(logger),
      benchmark: true,
      retry: {
        max: 3,
      },
    });

    db.addModels(models);

    await db.sync();

    return db;
  },
  inject: [PinoLogger],
};
