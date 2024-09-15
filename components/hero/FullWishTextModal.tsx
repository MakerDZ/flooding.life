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
    data?: any;
}

export const FullWishTextModal = (prop: ModalProp) => {
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
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>
                            <p className="text-[#4C5766]">{prop.data.letter}</p>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
