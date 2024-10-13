import { DataSourceOptions } from 'typeorm';
import { User } from '../database/entity/User.entity';
import { UserProfile } from '../database/entity/UserProfile.entity';

export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: Number(3306),
  username: 'root',
  password: 'r0bonepal77@',
  database: 'instagram',
  migrationsTableName: 'migrations',
  synchronize: true,
  // logging: process.env.NODE_ENV === "dev",
  entities: [User, UserProfile],
  logging: false,
} as DataSourceOptions;
