import { Request, Response } from 'express';
import AccountService from '../services/digitalEasy/account';


export class AccountController {


    static async getById(req: Request, res: Response): Promise<void> {

        try {
            const accountId = req.params.accountId;
            if (!accountId) {
                res.status(400).json({ message: 'Account ID is required' });
                return;
            }
            const account = await AccountService.getInstance().getById(accountId);
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching account', error });
        }
    }
    
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

    static async address(req: Request, res: Response): Promise<void> {
        try {
            const accountData = req.body;

            accountData.country = 'BRAZIL';

            const newAccount = await AccountService.getInstance().createAddress(accountData);
            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json({ message: 'Error creating address', error });
        }
    }

    static async phone(req: Request, res: Response): Promise<void> {
        try {
            const accountData = req.body;

            const phoneStr = accountData.phone.replace(/\D/g, '');
            const country_code = phoneStr.substring(0, 2);
            const area_code = parseInt(phoneStr.substring(2, 4), 10);
            const number = phoneStr.substring(4);

            const newAccount = await AccountService.getInstance().createPhone({
                country_code,
                area_code,
                number,
                type: 'MOBILE',
                accountId: accountData.accountId,
            });
            res.status(201).json(newAccount);
        } catch (error) {
            res.status(500).json({ message: 'Error creating address', error });
        }
    }

    static async createFullAccount(req: Request, res: Response): Promise<void> {
        try {
            const accountData = req.body;

            accountData.document = accountData.document.replace(/\D/g, ''); // Remove non-numeric characters
            accountData.programId = process.env.DE_PROGRAM_ID;

            const phoneStr = accountData.phone.replace(/\D/g, '');
            const country_code = phoneStr.substring(0, 2);
            const area_code = parseInt(phoneStr.substring(2, 4), 10);
            const number = phoneStr.substring(4);

            const [account, address, phone] = await Promise.all([

                AccountService.getInstance().createAccount(accountData),

                AccountService.getInstance().createAddress({
                    accountId: accountData.accountId,
                    address_type: 'RESIDENTIAL',
                    address: accountData.address,
                    number: accountData.number,
                    neighborhood: accountData.neighborhood,
                    zip_code: accountData.zip_code,
                    city: accountData.city,
                    state: accountData.state,
                    country: 'BRAZIL',
                }),
                AccountService.getInstance().createPhone({
                    country_code,
                    area_code,
                    number,
                    type: 'MOBILE',
                    accountId: accountData.accountId,
                })

            ]);
            res.status(201).json({
                account,
                address,
                phone
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating account', error });
        }

    }

}