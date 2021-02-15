import { IssuePriority, IssueStatus, IssueType } from '@/shared/gql/enums';
import { Issue, User } from 'shared/entities';
import { UserInput } from '@/shared/gql/types/UserInput';
import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class IssueUpdateInput implements Partial<Issue> {
  @Field({ nullable: true })
  title: string;

  @Field(() => IssueStatus, { nullable: true })
  status: IssueStatus;

  @Field(() => IssueType, { nullable: true })
  type: IssueType;

  @Field(() => IssuePriority, { nullable: true })
  priority: IssuePriority;

  @Field(() => Float, { nullable: true })
  listPosition: number;

  @Field({ nullable: true })
  reporterId: string;

  @Field(() => ID, { nullable: true })
  projectId: number;

  @Field(() => [UserInput], { nullable: true })
  users: User[];

  @Field(() => [ID], { nullable: true })
  userIds: string[];

  @Field({ nullable: true })
  description: string;
}
