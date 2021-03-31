import express from 'express';
import auth from '../middlewares/auth';

const authRouter = express.Router();

authRouter.post('/login', [ auth ]);

export default authRouter;