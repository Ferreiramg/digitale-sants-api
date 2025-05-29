import { Request, Response } from 'express';
import OrganizationService from '../services/digitalEasy/organization';

export class OrganizationController {


    static async get(req: Request, res: Response): Promise<void> {
        try {
            const organizations = await OrganizationService.getInstance().getCurrentOrganization();
            res.status(200).json(organizations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching organizations', error });
        }
    }

    static async createLotCards(req: Request, res: Response): Promise<void> {
        try {

            const { cardQuantity } = req.body;

            const programId = process.env.DIGITALEASY_PROGRAM_ID || '';

            if (!programId) {
                res.status(400).json({ message: 'Program ID is not set in environment variables.' });
                return;
            }

            const organizations = await OrganizationService.getInstance().createLoteCards(programId, cardQuantity);
            res.status(200).json(organizations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching organizations', error });
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

            const updatedWebhook = await OrganizationService.getInstance().setWebhook(webhookData);
            res.status(200).json(updatedWebhook);
        } catch (error) {
            res.status(500).json({ message: 'Error setting webhook', error });
        }
    }

    static async getAccounts(req: Request, res: Response): Promise<void> {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const perPage = parseInt(req.query.perPage as string) || 50;
            const q = req.query.q as string | undefined;

            const account = await OrganizationService.getInstance().listAllAccounts(page, perPage, q);
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching account', error });
        }

    }
}