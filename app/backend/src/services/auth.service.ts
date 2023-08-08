import * as bcrypt from 'bcryptjs';
import JwtUtility from '../utils/JWTUtility';
import UserModel from '../models/user.model';

class AuthService {
  private model: UserModel = new UserModel();
  private jwtUtility = new JwtUtility();

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await this.model.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const { username } = user;
    const token = this.jwtUtility.sign({ username, email });

    return token;
  }
}

export default AuthService;
