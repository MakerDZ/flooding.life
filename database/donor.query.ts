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
        console.log(err);
        throw new Error('Error adding new donor to the database.');
    }
}

async function donateRecord(donor: {
    token: string;
    email: string;
    donationAmount: number;
}) {
    try {
        await db.donor.update({
            where: {
                sessionId: donor.token,
            },
            data: {
                donationCount: { increment: 1 },
                abilityToWish: { increment: 1 },
                abilityToDropAid: { increment: 1 },
                totalDonatedAmount: { increment: donor.donationAmount },
                email: donor.email,
            },
        });
    } catch (err) {
        throw new Error('Error while creating donate record.');
    }
}

async function droppedAID(token: string) {
    try {
        const donor = await db.donor.findUnique({
            where: {
                sessionId: token,
            },
        });

        if (donor && donor.abilityToDropAid > 0) {
            const updatedDonor = await db.donor.update({
                where: {
                    sessionId: token,
                },
                data: {
                    abilityToDropAid: donor.abilityToDropAid - 1,
                },
            });

            return updatedDonor;
        } else {
            throw new Error('No remaining ability to drop aid.');
        }
    } catch (err) {
        throw new Error('Error while reducing the AID drop count.');
    }
}

export const Donor = {
    existence,
    create,
    donateRecord,
    droppedAID,
};
