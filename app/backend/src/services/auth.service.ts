import * as bcrypt from 'bcryptjs';
import JwtUtility from '../utils/JWTUtility';
import UserModel from '../models/user.model';
import { ServiceResponse } from '../Interfaces/types/ServiceResponse';
import { IUserRole } from '../Interfaces/users/IUserRole';

class AuthService {
  private model: UserModel = new UserModel();

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await this.model.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const { username } = user;
    const token = JwtUtility.sign({ username, email });

    return token;
  }

  async getUserRole(email: string): Promise<ServiceResponse<IUserRole>> {
    const user = await this.model.findByEmail(email);

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}

export default AuthService;
