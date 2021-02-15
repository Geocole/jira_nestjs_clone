import { User } from 'shared/entities';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ defaultValue: '' })
  avatarUrl: string;

  @Field(() => Int, { nullable: true })
  projectId: number;

  @Field({ nullable: true })
  password?: string;
}
