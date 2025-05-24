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
}