// BUSCA A CONFIG DO DB E REALIZA A CONEXÃO

import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      // execute associate method if it exists
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
