import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username, password);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async register(user: any) {
    const receivedUser = await this.userService.create(user);
    if (receivedUser) {
      return receivedUser;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
