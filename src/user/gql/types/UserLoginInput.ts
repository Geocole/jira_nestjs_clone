import { User } from 'shared/entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput implements Partial<User> {
  @Field()
  email: string;
  @Field()
  password: string;
}
