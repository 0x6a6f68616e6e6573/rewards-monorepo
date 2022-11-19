import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { hero } from 'proto/src';

@Table
export class Hero extends Model implements hero.Hero {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;
}
