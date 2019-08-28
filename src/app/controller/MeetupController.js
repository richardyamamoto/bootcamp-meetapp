import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      location: Yup.string().required(),
    });

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
}

export default new MeetupController();
