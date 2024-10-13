import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentReply } from './CommentReply.entity';
import { Post } from './Posts.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: false })
  comment!: string;

  @Column({ type: 'int', default: 0 })
  comment_like!: string;


  @ManyToOne(() => Post,(post) => post.comment)
  post !: Post


  @OneToMany(() => CommentReply, (commentReply) => commentReply.comment)
  commentReply!: CommentReply[];

  @CreateDateColumn()
  commented_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
