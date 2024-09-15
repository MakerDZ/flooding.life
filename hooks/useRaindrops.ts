import { useEffect } from 'react';

export function useRaindrops() {
    useEffect(() => {
        function createRaindrops() {
            const rain = document.querySelector('.rain');
            if (!rain) return;

            for (let i = 0; i < 100; i++) {
                const raindrop = document.createElement('div');
                raindrop.classList.add('raindrop');
                raindrop.style.left = `${Math.random() * 100}%`;
                raindrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
                raindrop.style.animationDelay = `${Math.random() * 2}s`;
                rain.appendChild(raindrop);
            }
        }

        createRaindrops();
    }, []);
}
