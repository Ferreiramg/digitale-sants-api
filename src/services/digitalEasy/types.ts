export interface AuthResponse {
    token: {
        message: string;
        organization: {
            name: string;
            document: string;
            email: string;
            isActive: boolean;
            type: string;
            webhookNotificationUri: string;
            webhookNotificationToken: string;
            webhookAuthorizationUri: string;
            webhookAuthorizationToken: string;
            totalDependentsPerAccount: number;
            createdAt: string; // ISO date string
            updatedAt: string; // ISO date string
        };
        token: string;
    }
}

export interface CreateAccountPayload {
    name?: string;
    limit?: number;
    document: string;
    programId: number;
    dueDateId?: number;
}

export interface CreateAccountResponse {
    message: string;
    account: {
        name: string;
        document: string;
        application_id: number;
        status: number;
        status_name: string;
        account_id: number;
        customer_id: number;
        entity_id: number;
        program_id: number;
        due_date_id: number;
        due_date_day: number;
        organization: string;
        max_credit_limit: number;
        total_credit_limit: number;
        _id: string;
        addresses: any[];
        phones: any[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}

// Define a type for the webhook payload
export interface WebhookOrganizationPayload {
    webhookNotificationUri?: string;
    webhookNotificationToken?: string;
    webhookAuthorizationUri?: string;
    webhookAuthorizationToken?: string;
}

export interface AddressAccountPayload {
    accountId: number | undefined;
    address_type: string;
    address: string;
    number: number;
    neighborhood: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    complementary_address?: string;
}

export interface CardPayloadCreate {
    type: "VIRTUAL" | "PLASTIC";
    name: string;
    embossing_name: string;
    transaction_limit: number;
    accountId: string;
    customerId: number;
}

export interface CardResponseCreate {
    message: string;
    card: {
        _id: string;
        card_id: number;
        name: string;
        printed_name: string;
        type: "VIRTUAL" | "PLASTIC";
        status: string;
        contactless_enabled: boolean;
        cvv_rotation_interval_hours: number;
        transaction_limit: number;
        abu_enabled: boolean;
        customer_id: number;
        account_id: number;
        createdAt: string;
        updatedAt: string;
    };
}