import { db } from '@/lib/database';

async function create(donor: {
    id: string;
    heroName: string;
    letter: string;
    socialLink: string;
}) {
    try {
        const newLetter = await db.wishLetter.create({
            data: {
                heroName: donor.heroName,
                letter: donor.letter,
                socialLink: donor.socialLink,
                Donor: {
                    connect: { id: donor.id },
                },
            },
        });
        return newLetter;
    } catch (err) {
        throw new Error('Error while creating wish letter.');
    }
}

async function getAll() {
    try {
        const letters = await db.wishLetter.findMany();
        return letters;
    } catch (err) {
        throw new Error(
            'Erorr while fetching all wish letter from the database.'
        );
    }
}

export const WishLetter = {
    create,
    getAll,
};
