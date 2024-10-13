import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './UserProfile.entity';
import { Post } from './Posts.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: false })
  username!: string;

  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile!: UserProfile;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
