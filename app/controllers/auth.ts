import express, { Request, Response } from 'express';
import auth, { failResponse, getCurrentUser } from '../middlewares/auth';
import User, { UserData } from '../models/User';
import bcrypt from 'bcrypt';
import { logger } from '../kernel';
import only from '../helpers/only';
import jwt from 'jsonwebtoken';

if (! logger) 
    throw new Error('Logger not made');

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response): Promise<Response> => {
    const email: string | undefined = req.body.email;
    const password: string | undefined = req.body.password;

    if (!email || !password)
        return failResponse(res);

    const user: User | null = await User.whereEmail(email, []);

    if (!user)
        return failResponse(res);
    
    if (! bcrypt.compareSync(password, user.getDataValue('password')))
        return failResponse(res);

    return res.json({
        success: true,
        jwtoken: user.getDataValue('jwtoken')
    });
});

authRouter.post('/register', async (req: Request, res: Response): Promise<Response> => {
    try {
        const userCredentials: UserData|any = only(req.body, ['name', 'email', 'password', 'age']);
        const newUser = new User(userCredentials);

        newUser.setDataValue('password', bcrypt.hashSync(userCredentials.password, 10));
        newUser.setDataValue('jwtoken', jwt.sign(newUser.getDataValue('password'), process.env.JWTKEY!!));

        await newUser.validate();
        await newUser.save();
        
        return res.json({ user: newUser.toJSON() });
    } catch (e) {
        logger(e);
        return res.status(500).json({ error: 'Oooops, sorry, but we are on trouble now, try again later' });
    }
});

authRouter.post('/edit', [ auth, async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = getCurrentUser(req);
        const userCredentials: UserData|any = only(req.body, ['name', 'age']);

        for(const key in userCredentials)
            user.setDataValue(key, userCredentials[key] ?? user.getDataValue(key));
        
        await user.save();

        return res.json({ success: true, user: user.toJSON() });
    } catch (e) {
        logger(e);
        return res.status(500).json({ error: 'Oooops, sorry, but we are on trouble now, try again later' });
    }
}]);

authRouter.get('/view', [ auth, (req: Request, res: Response): Response => {
    return res.json({ user: getCurrentUser(req).toJSON() });
}]);

export default authRouter;