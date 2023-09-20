import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredential } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredential: AuthCredential): Promise<User> {
    const res = await this.userRepository.createUser(authCredential);
    return res;
  }

  async validateUser(authCredential: AuthCredential): Promise<any> {
    const { userName, password } = authCredential;
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });
    const isMatch = await bcrypt.compare(password, user.password);
  }
  async login(authCredential: AuthCredential): Promise<{ token: string }> {
    const { userName, password } = authCredential;
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });

    if (!user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return {
      token: this.jwtService.sign(authCredential),
    };
  }
}
