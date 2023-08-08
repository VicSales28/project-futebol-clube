import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import Model from '../database/models/UserModel';

class UserModel implements IUserModel {
  private model = Model;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    // Procurando um usuário no banco de dados com o email fornecido
    const userFound = await this.model.findOne({ where: { email } });
    // Verificando se nenhum usuário foi encontrado
    if (!userFound) {
      return null;
    }
    // Se um usuário foi encontrado, retornar o usuário
    return userFound;
  }
}

export default UserModel;
