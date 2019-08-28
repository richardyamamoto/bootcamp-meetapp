import multer from 'multer';
/* resolve to navigate to the directory
 * extname return the file extension
 */
import { resolve, extname } from 'path';
// Generate a random byte to the name
import crypto from 'crypto';

export default {
  // Store the files in a temp file
  storage: multer.diskStorage({
    // Going to ~/src/tmp/uploads
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Return file name with crypto random bytes + extention name
    filename: (req, file, cb) => {
      // Generate the random bytes
      crypto.randomBytes(16, (err, res) => {
        // If error true cb(callback) return error
        if (err) return cb(err);
        // return the file name with treatment
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
