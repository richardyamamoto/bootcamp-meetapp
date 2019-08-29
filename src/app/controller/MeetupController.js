import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  // List Meetups
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;
    // Search date from query
    if (req.query.date) {
      const searchedDate = parseISO(req.query.date);
      where.date = {
        [Op.between]: [startOfDay(searchedDate), endOfDay(searchedDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [User],
      limit: 10,
      offset: page * 10 - 10,
    });

    return res.json(meetups);
  }

  // Create Meetup
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      location: Yup.string().required(),
    });
    // Validate schema
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    // Check date if is before current date
    const { date } = req.body;
    const checkDate = isBefore(new Date(), parseISO(date));
    if (!checkDate) {
      return res.status(401).json({ error: 'Past date are not allowed' });
    }

    // Create Meetup
    const user_id = req.userId;
    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });
    return res.json({ meetup });
  }

  // Update Meetup
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid())) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    // User if from token
    const user_id = req.userId;
    // Find Meetup by ID
    const meetup = await Meetup.findByPk(req.params.id);
    // Check if User created the meetup
    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    // Check the current date and meetup date
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(401).json({ error: 'Past date not allowed' });
    }
    // Check if Meetup is up to date
    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetup" });
    }
    // Update meetup
    await meetup.update(req.body);

    return res.json(meetup);
  }

  // Delete Meetup
  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    // User id from token authentication
    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    if (meetup.past) {
      return res.status(401).json({ error: "Can't delete past Meetup" });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
