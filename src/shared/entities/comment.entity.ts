import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import Issue from './issue.entity';
import is, { FieldValidators } from '@/shared/helpers/validations.helper';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
class Comment extends BaseEntity {
  static validation: FieldValidators = {
    body: [is.required(), is.maxLength(255)],
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  body: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('integer')
  issueId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field(() => Issue)
  @ManyToOne(() => Issue, (issue) => issue.comments, { onDelete: 'CASCADE' })
  issue: Issue;
}

export default Comment;
