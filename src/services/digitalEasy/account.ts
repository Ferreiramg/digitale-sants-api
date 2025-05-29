import AbstractRequest from '../../abstractRequest';
import { AddressAccountPayload, AuthResponse, CreateAccountPayload, WebhookOrganizationPayload } from './types';

class AccountService extends AbstractRequest {
    private static instance: AccountService;
    private Authorization: string | undefined;

    constructor(token?: string) {
        const baseUrl = process.env.DE_API_URL ?? '';
        if (!baseUrl) {
            throw new Error('Environment variable DE_API_URL is not defined');
        }
        super(baseUrl, 10000); // Base URL e timeout
        this.Authorization = process.env.DE_JWT_TOKEN ?? token;
    }

    async getById(accountId: string): Promise<any> {
        try {
            const response = await this.get(`/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch account by ID: ${error.message}`);
            }
            throw new Error('Failed to fetch account by ID: An unknown error occurred');
        }
    }

    async createAccount(payload: CreateAccountPayload): Promise<AuthResponse> {
        try {
            console.log('payload', payload);
            const response = await this.post<AuthResponse>('/organizations', payload, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Account creation failed: ${error.message}`);
            }
            throw new Error('Account creation failed: An unknown error occurred');
        }
    }

    async createAddress(payload: AddressAccountPayload): Promise<any> {
        try {
            const account = payload.accountId;
            delete payload.accountId;


            const response = await this.post(`/accounts/${account}/addresses`, payload, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Webhook setting failed: ${error.message}`);
            }
            throw new Error('createAddress setting failed: An unknown error occurred');
        }
    }

    async createPhone(payload: {
        country_code: string;
        area_code: number;
        number: string;
        type: "MOBILE" | "LANDLINE";
        accountId: number | undefined;
    }): Promise<any> {
        try {
            const account = payload.accountId;
            delete payload.accountId;

            const response = await this.post(`/accounts/${account}/phones`, payload, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Webhook setting failed: ${error.message}`);
            }
            throw new Error('createAddress setting failed: An unknown error occurred');
        }
    }
    

    static getInstance(token?: string | undefined): AccountService {
        if (!AccountService.instance) {
            AccountService.instance = new AccountService(token);
        }
        return AccountService.instance;
    }
}

export default AccountService;