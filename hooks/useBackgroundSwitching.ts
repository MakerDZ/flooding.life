import { useState, useEffect } from 'react';

const backgrounds = [
    'https://www.rfa.org/english/news/myanmar/signal-2024-09-13-other.jpeg/@@images/04094756-1594-4624-a926-0805a608d7a7.jpeg',
    'https://floodlist.com/wp-content/uploads/2023/10/Floods-in-Bago-Myanmar-October-2023-Myanmar-Fire-Services-Department-3-343x187.jpg',
    'https://www.netherlandswaterpartnership.com/sites/nwp_corp/files/styles/keyvisual_large/public/2019-09/DRR%20Myanmar%20900x450.jpg?h=a9f5c027&itok=dL4VtBnq',
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/EB52/production/_84624206_84624205.jpg',
];

export function useBackgroundSwitching(intervalMs: number = 5000) {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex(
                (prevIndex) => (prevIndex + 1) % backgrounds.length
            );
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return backgrounds[backgroundIndex];
}
