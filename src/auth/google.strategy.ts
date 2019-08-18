import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly authService: AuthService) {
    super({
      clientID: '658946669648-o0tvaj3lbkmb9924vkgf7udcmk5ersfv.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: 'QqmEmEr8rTAKRXM3XE6utwI6', // <- Replace this with your client secret
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
