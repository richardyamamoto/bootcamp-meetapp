import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    if (!user.checkPassword(password)) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    return res.json({
      message: 'Successful login',
    });
  }
}

export default new SessionController();
