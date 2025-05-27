import { Request, Response } from 'express';
import ApiService from '../services/digitalEasy/auth';

export class LoginController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(422).json({ message: 'Username and password are required.' });
                return;
            }

            const token = await ApiService.getInstance().login(email, password)

            if (!token) {
                res.status(401).json({ message: 'Invalid credentials.' });
                return;
            }

            res.status(200).json({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    static async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const email = process.env.DE_ORGANIZACION_EMAIL ?? '';
            const password = process.env.DE_ORGANIZACION_PASS ?? '';

            const token = await ApiService.getInstance().login(email, password);

            if (!token) {
                res.status(401).json({ message: 'Invalid credentials.' });
                return;
            }

            //TODO: persist the new token in the user session or database as needed

            res.status(200).json(token.token);
        } catch (error) {
            console.error('Refresh token error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
}