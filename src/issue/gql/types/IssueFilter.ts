import { IssuePriority, IssueStatus, IssueType } from '@/shared/gql/enums';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
class IssueFilterArg {
  @Field(() => IssueStatus, { nullable: true })
  status?: IssueStatus;

  @Field(() => IssueType, { nullable: true })
  type?: IssueType;

  @Field(() => IssuePriority, { nullable: true })
  priority?: IssuePriority;

  @Field(() => String, { nullable: true })
  reporterId?: string;
}

export default IssueFilterArg;
