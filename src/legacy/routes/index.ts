import { Router } from 'express';
import { default as AuthRouter } from './authRouter';
import { default as SearchRouter } from './searchRouter';
import { default as PartnersRouter } from './partnersRouter';

const router: Router = Router();

router.use('/auth', AuthRouter);
router.use('/search', SearchRouter);
router.use('/partners', PartnersRouter);
router.get('/', (req, res) => {
  res.send('hello world!!!');
});

export default router;
