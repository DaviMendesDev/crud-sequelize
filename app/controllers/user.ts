import express, { Request, Response } from 'express';
import auth from '../middlewares/auth';
import User from '../models/User';

const userRouter = express.Router();

userRouter.get('/search', async (req: Request, res: Response): Promise<Response> => {
    const users = await User.findAll() || [];

    return res.json({ users: users });
});

export default userRouter;