'use client';

import React, { useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { useAction } from 'next-safe-action/hooks';
import checkoutAction from '@/actions/home/checkout.action';
import { Spinner } from '@nextui-org/spinner';
import toast from 'react-hot-toast';

interface ModalProp {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
    data?: any;
}

const ImageDb = [
    {
        image: '/Water.svg',
        title: 'Water',
        animation: 'bouncing',
    },
    {
        image: '/rice.svg',
        title: 'rice',
        animation: 'rotate',
    },
    {
        image: '/clothes.svg',
        title: 'clothes',
        animation: 'scale',
    },
    {
        image: '/AidKit.svg',
        title: 'AidKit',
        animation: 'shake',
    },
];

export const DonateFirstModal = (prop: ModalProp) => {
    const { execute, status, result } = useAction(checkoutAction);
    useEffect(() => {
        if (result.data?.checkoutURL && result.data.success) {
            window.location.href = result.data.checkoutURL;
        }

        if (result.data?.checkoutURL == null && result.data?.success == false) {
            toast.error(`${result.data?.message}`);
        }
    }, [result]);

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
                            <p className="text-[#4C5766]">
                                After donating, you can write a wish for the
                                Burmese people, linked to your Twitter profile,
                                and it will appear publicly in the hero page.
                                You&apos;ll also able to experience an animation
                                to feel actively involved in the crisis relief.
                            </p>

                            <div className="flex flex-row gap-2 my-3">
                                {ImageDb.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 rounded-lg p-2 cursor-pointer"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`w-[120px] h-[100px] ${item.animation}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                disabled={status == 'executing'}
                                onClick={() => {
                                    execute();
                                }}
                                className="z-10 w-32 font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            >
                                {status == 'executing' ? (
                                    <Spinner size="sm" color="warning" />
                                ) : (
                                    'Donate Now'
                                )}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
