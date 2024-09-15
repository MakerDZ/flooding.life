import { useRef, useState } from 'react';

type foodSupply = 'Water' | 'rice' | 'clothes' | 'AidKit';

const useDropSupply = (confettiRef: React.RefObject<any>) => {
    
    const [showConfetti, setShowConfetti] = useState(false);

    const dropFood = (supply: foodSupply) => {
        const food = document.createElement('div');
        const foodImage = document.createElement('img');

        foodImage.src = `/${supply}.svg`;
        foodImage.alt = supply;
        foodImage.classList.add('food-image');
        food.classList.add('food');
        food.appendChild(foodImage);
        document.body.appendChild(food);

        setTimeout(() => {
            food.remove();
            setShowConfetti(true);
            confettiRef.current?.start();

            setTimeout(() => {
                setShowConfetti(false);
            }, 500);
        }, 3000);
    };

    return { dropFood, showConfetti };
};

export default useDropSupply;
