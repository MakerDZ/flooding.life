'use client';
import React from 'react';
import { Button } from '@nextui-org/button';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { WhatsHappeningModal } from '@/components/home/WhatsHappeningModal';
import Confetti from '@/components/Confetti';
import { useBackgroundSwitching } from '@/hooks/useBackgroundSwitching';
import { useRaindrops } from '@/hooks/useRaindrops';
import { useConfettiAndAid } from '@/hooks/useConfettiAndAid';
import { DropAIDModal } from '@/components/home/SendAIDModal';
import { DonateFirstModal } from '@/components/home/DonateFirstModal';
import { useSendAID } from '@/hooks/useSendAID';

function App() {
    const backgroundImage = useBackgroundSwitching(5000);
    useRaindrops();
    const { confettiRef, happeningModal, dropFood, showConfetti } =
        useConfettiAndAid();
    const { donateFirstModal, dropAIDModal, sendAID } = useSendAID();

    return (
        <>
            <div className="w-full relative rounded-2xl">
                <div
                    className="background"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />
                <div className="dark-overlay" />
                <div className="overlay" />
                <div className="rain" />
                <div className="wave" />
                <div className="wave" />
                <img className="boat" src="/Kid.svg" alt="kid" />
                <div className="p-4 flex flex-row space-x-3 items-center">
                    <Button
                        className="z-10 font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        onClick={sendAID}
                    >
                        Send Aid
                    </Button>
                    <button
                        aria-label="What's happening?"
                        onClick={happeningModal.onOpen}
                        className="z-50 cursor-pointer opacity-50"
                    >
                        <BsFillQuestionCircleFill size={21} />
                    </button>
                </div>
            </div>
            <WhatsHappeningModal
                closeIt={happeningModal.onClose}
                isOpen={happeningModal.isOpen}
                onOpenChange={happeningModal.onOpenChange}
            />
            <DropAIDModal
                closeIt={dropAIDModal.onClose}
                isOpen={dropAIDModal.isOpen}
                onOpenChange={dropAIDModal.onOpenChange}
            />
            <DonateFirstModal
                closeIt={donateFirstModal.onClose}
                isOpen={donateFirstModal.isOpen}
                onOpenChange={donateFirstModal.onOpenChange}
            />
            {showConfetti && <Confetti ref={confettiRef} />}
        </>
    );
}

export default App;
