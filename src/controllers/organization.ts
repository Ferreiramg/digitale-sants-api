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