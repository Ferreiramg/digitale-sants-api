import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
    origin: ['http://localhost:3000', 'https://your-production-domain.com'], // Add allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

export default corsConfig;