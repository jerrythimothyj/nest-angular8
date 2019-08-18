import { Injectable, Inject, forwardRef, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // console.log('came to validateOAuthLogin');
      const payload = {
        thirdPartyId,
        provider,
      };

      // const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      // return jwt;
      return this.jwtService.sign(payload);
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username, password);
    if (user) {
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
