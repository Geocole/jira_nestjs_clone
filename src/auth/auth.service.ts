import { UserLoginInput } from 'user/gql/types/UserLoginInput';
import { UserService } from 'user/user.service';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from 'shared/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyUser({
    email,
    password,
  }: UserLoginInput): Promise<Partial<User> | null> {
    const user = await this.userService.getEntity({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user;

        return result;
      } else {
        return null;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
