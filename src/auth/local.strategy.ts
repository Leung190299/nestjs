import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { AuthCredential } from './dto/auth-credential.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(authCredential: AuthCredential): Promise<any> {
    const user = await this.authService.validateUser(authCredential);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
