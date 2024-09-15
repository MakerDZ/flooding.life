'use server';

import { Donor } from '@/database/donor.query';
import { cookies } from 'next/headers';

const droppedAIDAction = async () => {
    try {
        const cookieStore = cookies();
        const donorToken = cookieStore.get('donorToken')?.value;
        if (!donorToken) {
            return false;
        }
        const updatedAID = await Donor.droppedAID(donorToken);
        if (!updatedAID) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
};

export default droppedAIDAction;
