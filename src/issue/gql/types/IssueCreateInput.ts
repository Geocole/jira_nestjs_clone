import { IssuePriority, IssueStatus, IssueType } from '@/shared/gql/enums';
import { Issue, User } from 'shared/entities';
import { UserInput } from '@/shared/gql/types/UserInput';
import { Field, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class IssueCreateInput implements Partial<Issue> {
  @Field()
  title: string;

  @Field(() => IssueStatus, { nullable: true })
  status: IssueStatus;

  @Field(() => IssueType)
  type: IssueType;

  @Field(() => IssuePriority)
  priority: IssuePriority;

  @Field(() => Float)
  listPosition: number;

  @Field()
  reporterId: string;

  @Field(() => ID)
  projectId: number;

  @Field(() => [UserInput], { nullable: true })
  users: User[];

  @Field(() => [ID], { nullable: true })
  userIds: string[];

  @Field({ nullable: true })
  description: string;
}
