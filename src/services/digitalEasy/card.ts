import AbstractRequest from '../../abstractRequest';
import { CardPayloadCreate, CardResponseCreate } from './types';

class CardService extends AbstractRequest {
    private static instance: CardService;
    private Authorization: string | undefined;

    constructor(token?: string) {
        const baseUrl = process.env.DE_API_URL ?? '';
        if (!baseUrl) {
            throw new Error('Environment variable DE_API_URL is not defined');
        }
        super(baseUrl, 10000); // Base URL e timeout
        this.Authorization = process.env.DE_JWT_TOKEN ?? token;
    }


    async getCardDetails(cardId: string, accountId: string): Promise<any> {

        try {
            const response = await this.get(`/cards/${cardId}/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch card details: ${error.message}`);
            }
            throw new Error('Failed to fetch card details: An unknown error occurred');
        }
    }
    async blockCard(cardId: string, accountId: string, password: string): Promise<any> {

        try {
            const response = await this.get(`/cards/${cardId}/accounts/${accountId}/block`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                },
                data: { password }

            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch card details: ${error.message}`);
            }
            throw new Error('Failed to fetch card details: An unknown error occurred');
        }
    }

    async unblockCard(cardId: string, accountId: string, password: string): Promise<any> {
        try {
            const response = await this.get(`/cards/${cardId}/accounts/${accountId}/unblock`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                },
                data: { password }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to unblock card: ${error.message}`);
            }
            throw new Error('Failed to unblock card: An unknown error occurred');
        }
    }

    async createCard(payload: CardPayloadCreate): Promise<CardResponseCreate> {
        try {
            const response = await this.post<CardResponseCreate>('/cards', payload, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Card creation failed: ${error.message}`);
            }
            throw new Error('Card creation failed: An unknown error occurred');
        }
    }

    async getCardsByAccount(accountId: string, page?: number, perPage?: number): Promise<any> {
        try {
            const response = await this.get(`/cards`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                },
                params: {
                    accountId,
                    page: page ?? 1,
                    perPage: perPage ?? 50
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch cards by account: ${error.message}`);
            }
            throw new Error('Failed to fetch cards by account: An unknown error occurred');
        }
    }

    async getCardPin(cardId: string, accountId: string): Promise<string> {
        try {
            const response = await this.get(`/cards/${cardId}/accounts/${accountId}/password`, {
                headers: {
                    Authorization: `Bearer ${this.Authorization}`
                }
            });
            return (response.data as { pin: string }).pin;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch card PIN: ${error.message}`);
            }
            throw new Error('Failed to fetch card PIN: An unknown error occurred');
        }
    }

    static getInstance(token?: string): CardService {
        if (!CardService.instance) {
            CardService.instance = new CardService(token);
        }
        return CardService.instance;
    }

    // Add more service methods as needed
}

export default CardService;