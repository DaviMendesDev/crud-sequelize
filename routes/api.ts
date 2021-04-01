import express from 'express';
import auth from '../app/controllers/auth';
import users from '../app/controllers/user';

const router: express.Router = express.Router();

router.use(auth);
router.use('/users', users);

export default router;