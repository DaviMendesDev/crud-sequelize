import only from 'only';
import { Request, Response } from 'express'

function bearerToken (req: Request): string | undefined {
    const authorizationToken: string | undefined = req.header.authorization;
    if (!authorizationToken)
        return undefined;
    
    const token: string | undefined = authorizationToken.split(' ').pop();
    return token;
}

function failResponse(res: Response): Response {
    return res.json({
        success: false,
        message: 'Authentication failed',
    });
}

const auth = function (req: Request, res: Response, next: Function): Response {
    const jwtoken = bearerToken(req);

    if (!jwtoken)
        return failResponse(res);

    return res.json({ messagee: 'feature not available, comes soon.' });

    // TODO: make the auth user search
}

export default auth;