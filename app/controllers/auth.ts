import express, { Request, Response } from 'express';
import auth from '../middlewares/auth';

const authRouter = express.Router();

authRouter.post('/login', [ auth, (req: Request, res: Response): Response => {
    // TODO: make the login feature

    return res.json({ messagee: 'feature not available, comes soon.' });
}]);

export default authRouter;