import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  fullName!: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber!: string;

  @Column({ type: 'simple-enum', enum: ['user', 'admin'], default: 'user' })
  role!: string;

  @Column({ type: 'bool', default: false })
  status!: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  follower!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_id' })
  following!: User;

  @Column({ type: 'text', nullable: true })
  image!: string;

  @OneToOne(() => User, (user) => user.userProfile)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
