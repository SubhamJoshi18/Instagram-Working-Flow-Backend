import { DataSourceOptions } from 'typeorm';
import { User } from '../database/entity/User.entity';
import { UserProfile } from '../database/entity/UserProfile.entity';
import { Comment } from '../database/entity/Comment.entity';
import { CommentReply } from '../database/entity/CommentReply.entity';
import { Post } from '../database/entity/Posts.entity';

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
  entities: [User, UserProfile, Post, Comment, CommentReply],
  logging: false,
} as DataSourceOptions;
