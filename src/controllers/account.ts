import { Request, Response } from 'express';
import AccountService from '../services/digitalEasy/account';


export class AccountController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const accountData = req.body;

            accountData.document = accountData.document.replace(/\D/g, ''); // Remove non-numeric characters
            accountData.programId = process.env.DE_PROGRAM_ID;

            const newAccount = await AccountService.getInstance().createAccount(accountData);
            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json({ message: 'Error creating account', error });
        }
    }

    static async setWebhook(req: Request, res: Response): Promise<void> {
        try {
            const webhookData = req.body;

            console.log('webhookData', webhookData);

            if (!webhookData.webhookNotificationUri || !webhookData.webhookAuthorizationUri) {
                res.status(400).json({ message: 'webhookNotificationUri or webhookAuthorizationUri are required' });
                return;
            }

            if (webhookData.webhookAuthorizationUri && !webhookData.webhookAuthorizationToken) {
                res.status(400).json({ message: 'webhookNotificationToken required' });
                return;
            }

            if (webhookData.webhookNotificationUri && !webhookData.webhookNotificationToken) {
                res.status(400).json({ message: 'webhookNotificationToken required' });
                return;
            }

            const updatedWebhook = await AccountService.getInstance().setWebhook(webhookData);
            res.status(200).json(updatedWebhook);
        } catch (error) {
            res.status(500).json({ message: 'Error setting webhook', error });
        }
    }


}