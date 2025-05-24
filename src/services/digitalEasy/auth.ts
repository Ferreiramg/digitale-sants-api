import AbstractRequest from '../../abstractRequest';
import { AuthResponse } from './types';

class ApiService extends AbstractRequest {
    private static instance: ApiService;

    constructor() {
        super('https://api-hml.digitaleazy.dev.br', 10000); // Base URL e timeout
    }

    // Método para fazer login
    public async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await this.post<AuthResponse>('/organizations/login', {
                email,
                password
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            }
            throw new Error('Login failed: An unknown error occurred');
        }
    }

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
}

export default ApiService;