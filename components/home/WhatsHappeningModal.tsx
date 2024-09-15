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
                        <ModalBody className="space-y-3 pb-4">
                            <p className="text-[#4C5766]">
                                In September 2024, Typhoon Yagi left 10+ cities
                                in Myanmar suffering from severe floods. More
                                than 230,000 people had to flee their homes with
                                over 300+(still counting) deaths and over 400+(
                                still counting) missing. Multiple families
                                witnessed their loved ones and homes being
                                swiped away by the deadly strong current while
                                they had to cling to big trees for their dear
                                lives.
                            </p>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
