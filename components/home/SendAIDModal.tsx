'use client';

import React, { useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import useDonorData from '@/hooks/dataFetching/useDonorData';
import { Spinner } from '@nextui-org/spinner';

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

export const DropAIDModal = (prop: ModalProp) => {
    const { DonorData, isDonorDataLoading } = useDonorData();

    useEffect(() => {
        console.log(DonorData);
    }, [isDonorDataLoading]);

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
                            <div className="flex flex-row items-center space-x-3">
                                <p className="text-base text-[#505461] font-bold">
                                    Send AID
                                </p>
                                {isDonorDataLoading && (
                                    <Spinner size="sm" color="warning" />
                                )}
                            </div>
                        </ModalHeader>
                        <ModalBody className="">
                            <p className="text-[#4C5766]">
                                You can now drop the AID. We've created this
                                animation to give you the feeling that you're
                                actively helping during the crisis. What you
                                choose to drop here won’t affect the focus of
                                the donations.
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
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
