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
import { FaPaperPlane } from 'react-icons/fa';
import useDonorData from '@/hooks/dataFetching/useDonorData';
import { WriteWishModal } from '@/components/home/WriteWIshModal';

function App() {
    const backgroundImage = useBackgroundSwitching(5000);
    useRaindrops();
    const {
        confettiRef,
        happeningModal,
        dropFood,
        showConfetti,
        writeWishModal,
    } = useConfettiAndAid();
    const { donateFirstModal, dropAIDModal, sendAID } = useSendAID();
    const { DonorData } = useDonorData();

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
                <div className="flex flex-row items-center justify-between p-4 ">
                    <div className="flex flex-row space-x-3 items-center">
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
                    {DonorData &&
                        typeof DonorData.abilityToWish === 'number' &&
                        DonorData.abilityToWish > 0 && (
                            <button
                                onClick={writeWishModal.onOpen}
                                className="z-20"
                            >
                                <FaPaperPlane size={27} color="#ffffff" />
                            </button>
                        )}
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
                dropFood={dropFood}
            />
            <DonateFirstModal
                closeIt={donateFirstModal.onClose}
                isOpen={donateFirstModal.isOpen}
                onOpenChange={donateFirstModal.onOpenChange}
            />
            <WriteWishModal
                closeIt={writeWishModal.onClose}
                isOpen={writeWishModal.isOpen}
                onOpenChange={writeWishModal.onOpenChange}
            />
            {showConfetti && <Confetti ref={confettiRef} />}
        </>
    );
}

export default App;
