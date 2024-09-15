'use server';

import { Donor } from '@/database/donor.query';
import { WishLetter } from '@/database/wishletter.query';
import { actionClient } from '@/lib/safe-action';
import { createWishLetterSchema } from '@/validations/wishLetter.validation';
import { cookies } from 'next/headers';

const createWishLetterAction = actionClient
    .schema(createWishLetterSchema)
    .action(async ({ parsedInput: { name, letter, socialLink } }) => {
        try {
            const cookieStore = cookies();
            const donorToken = cookieStore.get('donorToken')?.value;

            //check valid permission to perform create wish letter
            if (!donorToken) {
                return {
                    status: 'failed',
                    data: [],
                };
            }

            const donor = await Donor.existence(donorToken);
            if (!donor) {
                return {
                    status: 'failed',
                    data: [],
                };
            }

            if (donor.abilityToWish <= 0) {
                return {
                    status: 'failed',
                    data: [],
                };
            }

            await Donor.wroteLetter(donorToken);
            const wishLetter = await WishLetter.create({
                id: donor.id,
                heroName: name,
                letter,
                socialLink,
            });

            return {
                status: 'success',
                data: wishLetter,
            };
        } catch (err) {
            console.log(err);
            return {
                status: 'failed',
                data: err,
            };
        }
    });

export default createWishLetterAction;
