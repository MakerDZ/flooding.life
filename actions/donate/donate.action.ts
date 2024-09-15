'use server';
import axios from 'axios';

interface LemonConfig {
    API_KEY: string;
    URL: string;
}

interface CheckoutResponse {
    success: boolean;
    message: string;
    checkoutURL: string | null;
}

const getLemonConfig = (): LemonConfig => ({
    API_KEY: process.env.LEMON_API ?? '',
    URL: process.env.LEMON_BASEURL ?? '',
});

const getHeaders = (apiKey: string) => ({
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${apiKey}`,
});

const createCheckoutPayload = (
    donorToken: string,
    storeId: string,
    productId: string
) => ({
    data: {
        type: 'checkouts',
        attributes: {
            checkout_options: {
                embed: true,
                dark: true,
                logo: true,
                button_color: '#111',
            },
            checkout_data: {
                custom: {
                    donorToken,
                },
            },
        },
        relationships: {
            store: {
                data: {
                    type: 'stores',
                    id: storeId,
                },
            },
            variant: {
                data: {
                    type: 'variants',
                    id: productId,
                },
            },
        },
    },
});

const donateAction = async (donorToken: string): Promise<CheckoutResponse> => {
    const { API_KEY, URL } = getLemonConfig();
    const PRODUCT_ID = process.env.PRODUCT_ID ?? '';
    const STORE_ID = process.env.STORE_ID ?? '';

    if (!API_KEY || !URL || !PRODUCT_ID || !STORE_ID) {
        throw new Error('Missing environment variables');
    }

    try {
        const response = await axios.post(
            `${URL}/checkouts`,
            createCheckoutPayload(donorToken, STORE_ID, PRODUCT_ID),
            { headers: getHeaders(API_KEY) }
        );

        if (!response.data?.data?.attributes?.url) {
            throw new Error('Unexpected response structure from server');
        }

        return {
            success: true,
            message: 'Successfully created checkout URL.',
            checkoutURL: response.data.data.attributes.url,
        };
    } catch (error) {
        console.error('Error creating checkout:', error);

        if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status ?? 'unknown';
            const errorMessage = error.response?.data?.message ?? error.message;
            return {
                success: false,
                message: `Failed to create checkout URL (Status ${statusCode}): ${errorMessage}`,
                checkoutURL: null,
            };
        } else {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred',
                checkoutURL: null,
            };
        }
    }
};

export default donateAction;
