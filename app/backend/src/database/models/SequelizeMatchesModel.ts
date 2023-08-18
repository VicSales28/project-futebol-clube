import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeamsModel from './SequelizeTeamsModel';

class SequelizeMatchesModel extends Model<InferAttributes<SequelizeMatchesModel>,
InferCreationAttributes<SequelizeMatchesModel>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });

SequelizeMatchesModel.belongsTo(SequelizeTeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeamsModel.hasMany(
  SequelizeMatchesModel,
  { foreignKey: 'homeTeamId', as: 'homeTeamsMatche' },
);

SequelizeTeamsModel.hasMany(
  SequelizeMatchesModel,
  { foreignKey: 'awayTeamId', as: 'awayTeamsMatche' },
);

export default SequelizeMatchesModel;
