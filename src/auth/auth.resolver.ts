import { ErrorInterceptor } from '@/shared/middlewares/errors.interceptor';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'shared/entities';
import { UserCreateInput } from 'user/gql/types/UserCreateInput';
import { UserService } from 'user/user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtResponseType } from 'shared/gql/types/JwtResponseType';
import { UserLoginInput } from 'user/gql/types/UserLoginInput';
import { CurrentUser } from './current_user.decorator';
@Resolver('Auth')
@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseInterceptors(ErrorInterceptor)
  @Mutation(() => User)
  async registerUser(@Args('user') userInput: UserCreateInput): Promise<User> {
    return await this.userService.createEntity(userInput);
  }

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ErrorInterceptor)
  @Query(() => JwtResponseType)
  async loginUser(
    @CurrentUser() user: User,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<JwtResponseType> {
    return this.authService.login(user);
  }
}
