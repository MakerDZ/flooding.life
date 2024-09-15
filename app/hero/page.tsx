import getLettersAction from '@/actions/wishLetter/getLetters.action';
import WishLetterDisplay from '@/components/hero/WishLetterDisplay';

interface Letter {
    id: string;
    heroName: string;
    letter: string;
    socialLink: string;
    donorId: string | null;
    createdAt: Date;
}

export const dynamic = 'force-dynamic';
export default async function Hero() {
    const letters: Letter[] = await getLettersAction();
    const cardData = letters.map((letter, index) => {
        return {
            id: `${index}`,
            type: 'custom',
            position: { x: 0, y: 0 },
            data: {
                ...letter,
            },
        };
    });
    return <WishLetterDisplay cardData={cardData} />;
}
