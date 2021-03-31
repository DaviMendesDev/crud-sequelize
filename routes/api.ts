import express from 'express';
import auth from '../app/controllers/auth';

const router: express.Router = express.Router();

router.use(auth);

export default router;