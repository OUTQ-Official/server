import { v4 } from 'uuid';
import multer from 'multer';
import path from 'path';

const partnersPortfolioMulter = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, '../../public/images/portfolios'));
    },
    filename(req, file, done) {
      let id = v4();
      let now = new Date();
      let fileName = `${id}${now.getSeconds()}${file.originalname}`;

      done(null, fileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

export default partnersPortfolioMulter;
