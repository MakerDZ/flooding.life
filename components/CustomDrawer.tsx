import { Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, content }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-25"
                    onClick={onClose}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            onClose();
                        }
                    }}
                />
            </Transition.Child>

            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
            >
                <div className="fixed inset-x-0 bottom-0 h-3/4 overflow-y-auto bg-white p-6 shadow-xl md:hidden rounded-t-3xl">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                    </h2>
                    <div className="mt-2">{content}</div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default Drawer;
