import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtResponseType {
  @Field()
  access_token: string;
}
