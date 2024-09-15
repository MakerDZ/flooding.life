import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

const lsqyConfig = {
    API_KEY: process.env.LEMON_API,
    URL: process.env.LEMON_BASEURL,
};

const headers = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

interface DonationRequest {
    location: number;
}

export async function POST(request: Request, res: Response) {
    //const { location }: DonationRequest = await request.json();
    const PRODUCT_ID = process.env.PRODUCT_ID;
    const STORE_ID = process.env.STORE_ID;

    try {
        const response = await axios.post(
            `${lsqyConfig.URL}/checkouts`,
            {
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
                                userID: '123',
                            },
                        },
                    },

                    relationships: {
                        store: {
                            data: {
                                type: 'stores',
                                id: STORE_ID,
                            },
                        },
                        variant: {
                            data: {
                                type: 'variants',
                                id: PRODUCT_ID,
                            },
                        },
                    },
                },
            },
            { headers }
        );
        console.log(response.data);
        return NextResponse.json({
            status: 200,
            checkoutURL: response.data.data.attributes.url,
        });
    } catch (error: any) {
        console.error(
            'Error creating checkout:',
            error.response?.data || error
        );
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
