'use server';
import { generateAccessToken } from '@/utils/generateAccessToken';
import { cookies } from 'next/headers';
import donateAction from '../donate/donate.action';
import { Donor } from '@/database/donor.query';

const checkoutAction = async () => {
    try {
        const cookieStore = cookies();
        const donorToken = cookieStore.get('donorToken')?.value;

        if (!donorToken || !(await Donor.existence(donorToken))) {
            //create token && setcookie && save token to db
            const donorToken = generateAccessToken();

            // Set a cookie that lasts for a year
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            cookieStore.set('donorToken', donorToken, {
                expires: oneYearFromNow,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: 'strict',
            });

            await Donor.create(donorToken);
            const donate = await donateAction(donorToken);
            return donate;
        }

        const donate = await donateAction(donorToken);
        return donate;
    } catch (err) {
        return {
            success: false,
            message: `Failed to create checkout URL : ${err}`,
            checkoutURL: null,
        };
    }
};

export default checkoutAction;
