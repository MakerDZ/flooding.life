'use server';
import { Donor } from '@/database/donor.query';
import { cookies } from 'next/headers';

const sendAIDValidate = async () => {
    const cookieStore = cookies();
    const donorToken = cookieStore.get('donorToken')?.value;

    if (!donorToken) {
        return {
            success: false,
            donationCount: 0,
            abilityToWish: false,
            abilityToDropAid: false,
        };
    }

    // checking is the donorToken was valid or not.
    try {
        const isDonor = await Donor.existence(donorToken);
        if (!isDonor) {
            return {
                success: false,
                donationCount: 0,
                abilityToWish: false,
                abilityToDropAid: false,
            };
        }

        return {
            success:
                isDonor.abilityToDropAid || isDonor.abilityToWish
                    ? true
                    : false,
            donationCount: isDonor.donationCount,
            abilityToWish: isDonor.abilityToWish,
            abilityToDropAid: isDonor.abilityToDropAid,
        };
    } catch (err) {
        // Database validation failed. We're able to return error modal.
        return {
            success: false,
            donationCount: 0,
            abilityToWish: false,
            abilityToDropAid: false,
        };
    }
};

export default sendAIDValidate;
