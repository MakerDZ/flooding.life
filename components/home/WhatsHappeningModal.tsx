'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';

interface ModalProp {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
}

export const WhatsHappeningModal = (prop: ModalProp) => {
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
                                What&apos;s Happening in Myanmar Right Now?
                            </p>
                        </ModalHeader>
                        <ModalBody className="space-y-3"></ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
