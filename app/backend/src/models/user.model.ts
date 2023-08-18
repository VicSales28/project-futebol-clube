import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

class UserModel implements IUserModel {
  private sequelizeUsersModel = SequelizeUsersModel;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    // Procurando um usuário no banco de dados com o email fornecido
    const userFound = await this.sequelizeUsersModel.findOne({ where: { email } });
    // Verificando se nenhum usuário foi encontrado
    if (!userFound) {
      return null;
    }
    // Se um usuário foi encontrado, retornar o usuário
    return userFound;
  }
}

export default UserModel;
