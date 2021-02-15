import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import striptags from 'striptags';
import Comment from './comment.entity';
import is, { FieldValidators } from '@/shared/helpers/validations.helper';
import { IssuePriority, IssueStatus, IssueType } from '@/shared/gql/enums';
import Project from './project.entity';
import { CustomBaseEntity } from './custom_base.entity';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
class Issue extends CustomBaseEntity {
  options = null;
  static validations: FieldValidators = {
    title: [is.required(), is.minLength(5), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(IssueType))],
    status: [is.required(), is.oneOf(Object.values(IssueStatus))],
    priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
    listPosition: is.required(),
    reporterId: is.required(),
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar')
  title: string;

  @Field(() => IssueType)
  @Column('varchar')
  type: IssueType;

  @Field(() => IssueStatus)
  @Column('varchar')
  status: IssueStatus;

  @Field(() => IssuePriority)
  @Column('varchar')
  priority: IssuePriority;

  @Field(() => Float)
  @Column('double precision')
  listPosition: number;

  @Field(() => Int)
  @Column('integer', { nullable: true })
  estimate: number;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  descriptionText: string | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  extimate: number | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  timeSpent: number | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { nullable: true })
  timeRemaining: number | null;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @Column('uuid')
  reporterId: string;

  @Field()
  @Column('uuid')
  projectId: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.issues)
  @JoinTable()
  users: User[];

  @Field(() => [Comment], { defaultValue: [] })
  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @Field(() => [ID])
  @RelationId((issue: Issue) => issue.users)
  userIds: string[];

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };
}

export default Issue;
