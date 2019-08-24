// Modulo responsável por "traduzir" JavaScript para o PostgreSQL
import Sequelize, { Model } from 'sequelize';
// Modulo responsável pela criação de hash
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // Método que verifica se o campo password existe e criar uma hash
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // Metodo verifica se o password da match com a hash criada
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
