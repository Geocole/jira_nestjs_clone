import { Field, ID, InputType } from '@nestjs/graphql';
import { Comment } from 'shared/entities';

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field()
  body: string;

  @Field(() => ID, { nullable: true })
  issueId: number;

  @Field(() => ID, { nullable: true })
  userId: string;
}
