import AbstractRequest from '../../abstractRequest';

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

    // Example method
    async getCardDetails(cardId: string) {
        return this.get(`/cards/${cardId}`);
    }

    // Add more service methods as needed
}

export default CardService;