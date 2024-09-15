import getLettersAction from '@/actions/wishLetter/getLetters.action';
import WishLetterDisplay from '@/components/hero/WishLetterDisplay';

export default async function Hero() {
    const letters = await getLettersAction();
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
    console.log(cardData);

    return <WishLetterDisplay cardData={cardData} />;
}
