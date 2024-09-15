import * as z from 'zod';

export const createWishLetterSchema = z.object({
    name: z.string().min(1),
    letter: z.string().min(1, 'Letter is required'),
    socialLink: z.string().url(),
});

export type TypeCreateWishLetterSchema = z.infer<typeof createWishLetterSchema>;
