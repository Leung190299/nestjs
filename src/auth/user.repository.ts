import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredential } from './dto/auth-credential.dto';
import { User } from './user.entity';
@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredential: AuthCredential): Promise<User> {
    const { userName, password } = authCredential;
    const passwordHash: string = await bcrypt.hash(password, 10);

    const userDB = await this.findOne({
      where: {
        userName,
      },
    });
    if (userDB) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user = this.create({ userName, password: passwordHash });
    return this.save(user);
  }
}
