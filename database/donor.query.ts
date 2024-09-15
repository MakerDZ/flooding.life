import { db } from '@/lib/database';

async function existence(token: string) {
    try {
        const donor = await db.donor.findUnique({
            where: {
                sessionId: token,
            },
            include: {
                wishletter: true,
            },
        });

        return donor;
    } catch (err) {
        throw new Error('Error fetching donor token from the database.');
    }
}

async function create(token: string) {
    try {
        const newDonor = await db.donor.create({
            data: {
                sessionId: token,
            },
        });
        return newDonor;
    } catch (err) {
        throw new Error('Error adding new donor to the database.');
    }
}

async function donateRecord(donor: {
    token: string;
    email: string;
    donationAmount: number;
}) {
    try {
        const updatedDonateRecord = await db.donor.update({
            where: {
                sessionId: donor.token,
            },
            data: {
                donationCount: { increment: 1 },
                abilityToWish: 0,
                abilityToDropAid: 0,
                totalDonatedAmount: { increment: donor.donationAmount },
                email: donor.email,
            },
        });
        console.log(updatedDonateRecord);
    } catch (err) {
        throw new Error('Error while creating donate record.');
    }
}

export const Donor = {
    existence,
    create,
    donateRecord,
};
