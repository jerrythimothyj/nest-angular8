import { Controller, Post, Body, Param, Req, Get, Res, Request, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../user/models/user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // initiates the Google OAuth2 login flow
        // console.log('res=', res);
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        // store profile data in db by calling a function like this.authService.storeGoogleProfile(req.user.profile)
        // console.log('req.user=', req.user);
        const jwt: string = req.user.jwt;
        if (jwt) {
            res.redirect('http://localhost:4200/login-success?access_token=' + jwt);
        } else {
            res.redirect('http://localhost:4200/login');
        }
    }

}
