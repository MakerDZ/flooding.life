import { Donor } from '@/database/donor.query';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    try {
        const clonedReq = req.clone();
        const eventType = req.headers.get('X-Event-Name');
        const body = await req.json();

        const secret = process.env.LEMON_HOOK_SECRET!;
        const hmac = crypto.createHmac('sha256', secret);
        const digest = Buffer.from(
            hmac.update(await clonedReq.text()).digest('hex'),
            'utf8'
        );
        const signature = Buffer.from(
            req.headers.get('X-Signature') || '',
            'utf8'
        );

        // Convert Buffer to Uint8Array for timingSafeEqual
        const digestUint8Array = new Uint8Array(digest);
        const signatureUint8Array = new Uint8Array(signature);

        if (!crypto.timingSafeEqual(digestUint8Array, signatureUint8Array)) {
            throw new Error('Invalid signature.');
        }

        // Logic according to event
        if (eventType === 'order_created') {
            const donorToken = body.meta.custom_data.donorToken;
            const donorEmail = body.data.attributes.user_email;
            const donationAmount = body.data.attributes.total;
            const isSuccessful = body.data.attributes.status === 'paid';

            if (isSuccessful) {
                //add to database.
                await Donor.donateRecord({
                    token: donorToken,
                    email: donorEmail,
                    donationAmount,
                });
            }
        }
        return NextResponse.json({
            status: 201,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
