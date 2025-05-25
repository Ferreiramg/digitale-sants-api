// File: src/services/digitalEasy/organization.ts
import AbstractRequest from '../../abstractRequest';

class OrganizationService extends AbstractRequest {

    private static instance: OrganizationService;
    private Authorization: string | undefined;

    constructor(token?: string) {
        const baseUrl = process.env.DE_API_URL ?? '';
        if (!baseUrl) {
            throw new Error('Environment variable DE_API_URL is not defined');
        }
        super(baseUrl, 10000); // Base URL e timeout
        this.Authorization = process.env.DE_JWT_TOKEN ?? token;
    }

    // Método para obter todas as organizações
    public async getCurrentOrganization(): Promise<any> {
        try {

            const response = await this.get('/organizations/current',
                {
                    headers: {
                        Authorization: `Bearer ${this.Authorization}`
                    }
                }

            );
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch organizations: ${error.message}`);
            }
            throw new Error('Failed to fetch organizations: An unknown error occurred');
        }
    }

    public async listAllAccounts(page?: number, perPage?: number, q?: string | undefined): Promise<any> {
        try {

            const response = await this.get('/accounts',
                {
                    headers: {
                        Authorization: `Bearer ${this.Authorization}`
                    },
                    params: {
                        page: page ?? 1,
                        perPage: perPage ?? 50,
                        q
                    }
                }

            );
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch organizations: ${error.message}`);
            }
            throw new Error('Failed to fetch organizations: An unknown error occurred');
        }
    }

    static getInstance(token?: string | undefined): OrganizationService {
        if (!OrganizationService.instance) {
            OrganizationService.instance = new OrganizationService(token);
        }
        return OrganizationService.instance;
    }


}

export default OrganizationService;