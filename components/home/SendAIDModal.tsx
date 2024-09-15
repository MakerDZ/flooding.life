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
                            {DonorData?.abilityToDropAid && <div>Drop</div>}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
