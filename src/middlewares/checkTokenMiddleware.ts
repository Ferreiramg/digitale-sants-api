import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiService from '../services/digitalEasy/auth';

const email = process.env.DE_ORGANIZACION_EMAIL ?? '';
const password = process.env.DE_ORGANIZACION_PASS ?? '';

const checkTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token_time = req.user.de_token_expires_at;
    const now = Date.now();
    const refreshThreshold = 30 * 60 * 1000; // 2 minutos em milissegundos

    try {

        if (token_time - refreshThreshold < now) {

            ApiService.getInstance().login(email, password).then((response) => {

                const { token } = response;

                const decoded = jwt.decode(token.token) as { exp: number };
                const expirationDate = new Date(decoded.exp * 1000);
                req.user.de_token = token.token;
                req.user.de_token_expires_at = expirationDate.getTime();
            });
        }

        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default checkTokenMiddleware;