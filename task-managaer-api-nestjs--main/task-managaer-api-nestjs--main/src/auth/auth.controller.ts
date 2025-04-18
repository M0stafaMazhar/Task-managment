import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.authService.register(userName, email, password);
  }

  @Post('login')
  async login(
      @Body('email') email: string,
      @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
