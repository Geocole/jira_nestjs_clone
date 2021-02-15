import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { User } from 'shared/entities';

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field(() => Int, { nullable: true })
  projectId: number;
}
