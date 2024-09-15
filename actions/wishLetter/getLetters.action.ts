'use server';

import { WishLetter } from '@/database/wishletter.query';

const getLettersAction = async () => {
    try {
        const wishLetter = await WishLetter.getAll();
        return wishLetter;
    } catch {
        return [];
    }
};

export default getLettersAction;
