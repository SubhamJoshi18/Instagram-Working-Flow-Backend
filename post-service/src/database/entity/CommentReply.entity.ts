import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment.entity';

@Entity()
export class CommentReply {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  comment_reply!: string;

 
  @ManyToOne(() =>Comment, (comments) => comments.commentReply)
  comment !: Comment

  @CreateDateColumn()
  reply_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

