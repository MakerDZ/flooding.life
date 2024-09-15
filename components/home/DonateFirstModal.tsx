'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import checkoutAction from '@/actions/home/checkout.action';

interface ModalProp {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
    data?: any;
}

export const DonateFirstModal = (prop: ModalProp) => {
    const donateNow = async () => {
        const checkout = await checkoutAction();
        if (!checkout.success) {
            console.log('Failed To Donate because of system error.');
            return;
        }
        window.location.href = checkout.checkoutURL!;
    };

    return (
        <Modal
            placement="center"
            isOpen={prop.isOpen}
            onOpenChange={prop.onOpenChange}
            onClose={prop.closeIt}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <p className="text-base text-[#505461] font-bold">
                                Before Sending AID
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-[#4C5766]">
                                Organisations in Myanmar are taking immediate
                                action for the rescue process. They are focusing
                                on rescuing the people and relocating them to
                                safe shelters first. To move forward to further
                                actions, a large number of first aid kits,
                                medication, clothing, food and resources to
                                build safe shelters are needed. Flooding Life is
                                an application that aims to send funds to those
                                organizations. All the funds will completely go
                                to the areas in need through those
                                organizations.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={donateNow}
                                className="z-10 font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            >
                                Donate Now
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
