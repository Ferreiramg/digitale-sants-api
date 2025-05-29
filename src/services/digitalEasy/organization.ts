// File: src/services/digitalEasy/organization.ts
import AbstractRequest from '../../abstractRequest';
import { WebhookOrganizationPayload } from './types';

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

    /**
     * Obtém a organização atual
     * @link https://digital-eazy-v3.readme.io/reference/get-current-org
     */
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

    /**
     * Lista todas as contas
     * @link https://digital-eazy-v3.readme.io/reference/list-accounts
     * @param page Número da página (default: 1)
     * @param perPage Número de itens por página (default: 50)
     * @param q Filtro de pesquisa (opcional)
     */
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

    /**
     * Cria um lote de cartões sem nome
     * @link https://digital-eazy-v3.readme.io/reference/create-noname-card-bulk
     */
    async createLoteCards(programId: string, cardQuantity: number): Promise<any> {
        try {
            const response = await this.post('/cards/no-name/lot', {
                programId,
                cardQuantity,
                contactless_enabled: false //disable contactless by default
            }, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Webhook setting failed: ${error.message}`);
            }
            throw new Error('Webhook setting failed: An unknown error occurred');
        }
    }

    /**
     * Define a webhook for the current organization
     * @link https://digital-eazy-v3.readme.io/reference/update-current-org
     * @param payload - The payload containing the webhook configuration
     */
    async setWebhook(payload: WebhookOrganizationPayload): Promise<any> {
        try {
            const response = await this.post('/organizations/current', payload, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Webhook setting failed: ${error.message}`);
            }
            throw new Error('Webhook setting failed: An unknown error occurred');
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