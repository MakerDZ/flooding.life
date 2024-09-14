'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { useDisclosure } from '@nextui-org/modal';
import { WhatsHappeningModal } from '@/components/home/WhatsHappeningModal';

function App() {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const happeningModal = useDisclosure();

    const backgrounds = [
        'https://www.rfa.org/english/news/myanmar/signal-2024-09-13-other.jpeg/@@images/04094756-1594-4624-a926-0805a608d7a7.jpeg',
        'https://floodlist.com/wp-content/uploads/2023/10/Floods-in-Bago-Myanmar-October-2023-Myanmar-Fire-Services-Department-3-343x187.jpg',
        'https://www.netherlandswaterpartnership.com/sites/nwp_corp/files/styles/keyvisual_large/public/2019-09/DRR%20Myanmar%20900x450.jpg?h=a9f5c027&itok=dL4VtBnq',
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/EB52/production/_84624206_84624205.jpg',
    ];

    useEffect(() => {
        function createRaindrops() {
            const rain: any = document.querySelector('.rain');

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

        const interval = setInterval(() => {
            setBackgroundIndex(
                (prevIndex) => (prevIndex + 1) % backgrounds.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    const dropFood = () => {
        const food = document.createElement('div');

        food.classList.add('food');
        document.body.appendChild(food);

        setTimeout(() => {
            food.remove();
        }, 2000);
    };

    return (
        <>
            <div className="w-full relative rounded-2xl">
                <div
                    className="background"
                    style={{
                        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
                    }}
                />
                <div className="dark-overlay" />
                <div className="overlay" />
                <div className="rain" />
                <div className="wave" />
                <div className="wave" />
                <img className="boat" src="/Kid.svg" />
                <div className="p-4 flex flex-row space-x-3 items-center">
                    <Button
                        className="z-10 font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        onClick={dropFood}
                    >
                        Send Aid
                    </Button>
                    <div
                        onClick={happeningModal.onOpen}
                        className="z-50 cursor-pointer opacity-50"
                    >
                        <BsFillQuestionCircleFill size={21} />
                    </div>
                </div>
            </div>
            <WhatsHappeningModal
                closeIt={happeningModal.onClose}
                isOpen={happeningModal.isOpen}
                onOpenChange={happeningModal.onOpenChange}
            />
        </>
    );
}

export default App;
