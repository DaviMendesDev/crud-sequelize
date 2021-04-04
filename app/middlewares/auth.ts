import { Request, Response } from 'express'
import User from '../models/User';

export const modelName = 'current_user';

export function getCurrentUser (req: Request): User {
    const user = req.app.locals[modelName];
    if (! user)
        throw new Error("middleware not in use");

    return user;
}

function bearerToken (req: Request): string | undefined {
    const authorizationToken: string | undefined = req.headers.authorization;
    if (!authorizationToken)
        return undefined;
    
    const token: string | undefined = authorizationToken.split(' ').pop();
    return token;
}

export function failResponse (res: Response): Response {
    return res.status(403).json({
        success: false,
        message: 'Authentication failed',
    });
}

function saveCurrentUserToNext (req: Request, user: User, next: Function): Function {
    req.app.locals[modelName] = user;
    return next();
}

const auth = async function (req: Request, res: Response, next: Function): Promise<Function|Response> {
    const jwtoken = bearerToken(req);

    if (!jwtoken)
        return failResponse(res);

    const user: User | null = await User.whereToken(jwtoken);

    if (! user)
        return failResponse(res);
    
    return saveCurrentUserToNext(req, user, next);
}

export default auth;