import User from '../models/User';

class UserController {
  async store(req, res) {
    const { id, name, email, password } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      password,
    });
  }
}

export default new UserController();
