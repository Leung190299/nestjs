import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredential } from './dto/auth-credential.dto';
import { User } from './user.entity';
@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredential: AuthCredential): Promise<void> {
    const { userName, password } = authCredential;
    const user = this.create({ userName, password });
    await this.save(user);
  }
}
