import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly authService: AuthService) {
    super({
      clientID: 'CLIENT_ID', // <- Replace this with your client id from google
      clientSecret: 'CLIENT_SECRET', // <- Replace this with your client secret from google
      callbackURL: 'http://localhost:3000/api/google/callback', // <- Replace this when going for production
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile) {
    const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
    return {
      jwt,
      profile,
    };
  }

}
