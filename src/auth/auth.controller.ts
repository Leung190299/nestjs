import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { AuthService } from './auth.service';
import { AuthCredential } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredential: AuthCredential): Promise<void> {
    await this.authService.signUp(authCredential);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
  @Public()
  @Post('/login')
  async login(
    @Body() authCredential: AuthCredential,
  ): Promise<{ token: string }> {
    return this.authService.login(authCredential);
  }
}
