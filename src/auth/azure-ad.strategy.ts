import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy as Strategy } from 'passport-azure-ad';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class AzureADStrategy extends PassportStrategy(Strategy, 'azuread-openidconnect') {
  constructor(private readonly authService: AuthService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${'YOUR_TENANT_GUID'}/.well-known/openid-configuration`,
      clientID: 'CLIENT_ID',
      allowHttpForRedirectUrl: true,
      scope: ['email', 'profile'],
      responseType: 'id_token',
      responseMode: 'form_post',
      redirectUrl: 'http://localhost:3000/api/azure-ad/callback',
    });
  }

  async validate(profile) {
    const jwt: string = await this.authService.validateOAuthLogin(profile.oid, Provider.AZURE_AD);
    return {
      jwt,
      profile,
    };
  }
}
