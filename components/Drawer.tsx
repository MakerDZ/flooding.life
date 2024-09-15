import React from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
} from '@nextui-org/react';

import './drawer.css';

type Props = Omit<
    ModalProps,
    | 'className'
    | 'fullScreen'
    | 'closeButton'
    | 'animated'
    | 'blur'
    | 'placement'
    | 'size'
>;

const Drawer: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Modal
            classNames={{
                wrapper: 'w-full',
            }}
            className={`drawer drawer-animated drawer-animated-slide-in`}
            animated={false}
            placement="top"
            hideCloseButton
            size="full"
            {...props}
        >
            {children}
        </Modal>
    );
};

export const DrawerContent = ModalContent;
export const DrawerHeader = ModalHeader;
export const DrawerBody = ModalBody;
export const DrawerFooter = ModalFooter;

export default Drawer;
