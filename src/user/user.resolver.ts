/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'auth/current_user.decorator';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { User } from 'shared/entities';
import { AuthGuard } from 'shared/guards/auth.guard';
import { ErrorInterceptor } from 'shared/middlewares/errors.interceptor';
import { GQLContext } from 'shared/types/context';
import { UseMiddleware } from 'type-graphql';
import { UserCreateInput } from './gql/types/UserCreateInput';
import { UserService } from './user.service';

@Resolver('User')
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello world';
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Query(() => User)
  currentUser(@CurrentUser() user: User): User {
    console.log(user);
    return user;
  }

  @Mutation(() => User)
  async creatUser(@Args('user') userInput: UserCreateInput): Promise<User> {
    return await this.userService.createEntity(userInput);
  }
}
