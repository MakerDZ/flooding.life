'use client';
import checkoutAction from '@/actions/home/checkout.action';
import sendAIDValidate from '@/actions/home/sendAID.action';
import { Button } from '@nextui-org/button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/modal';
import { useSearchParams } from 'next/navigation';

export default function Donate() {
    const searchParams = useSearchParams();
    const donorToken = searchParams.get('session');
    const donateFirstModal = useDisclosure();
    const dropAIDModal = useDisclosure();

    const sendAID = async () => {
        const donor = await sendAIDValidate();
        if (!donor.success) {
            donateFirstModal.onOpen();
            return;
        }
        dropAIDModal.onOpen();
    };

    //Redirect checker after successful payment.
    if (donorToken) {
        (async () => {
            const donor = await sendAIDValidate();
            if (donor.success) {
                dropAIDModal.onOpen();
            }
        })();
    }

    return (
        <>
            <div className="w-full h-full bg-[#F2F8FE] rounded-2xl p-8 bg-lines space-y-3">
                <h1 className="font-bold text-lg">Test Donation</h1>
                <Button
                    onClick={sendAID}
                    size="md"
                    color="warning"
                    className="text-white font-bold"
                >
                    Drop Aid
                </Button>
            </div>
            <NeedToDonateFirst
                isOpen={donateFirstModal.isOpen}
                onOpenChange={donateFirstModal.onOpenChange}
                closeIt={donateFirstModal.onClose}
            />
            <AbleToDropAid
                isOpen={dropAIDModal.isOpen}
                onOpenChange={dropAIDModal.onOpenChange}
                closeIt={dropAIDModal.onClose}
            />
        </>
    );
}

const NeedToDonateFirst = (prop: {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
}) => {
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
                                Need To Donate First
                            </p>
                        </ModalHeader>
                        <ModalBody className="space-y-3">
                            <Button
                                onClick={donateNow}
                                size="md"
                                color="warning"
                                className="text-white font-bold"
                            >
                                Let Me Donate
                            </Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

const AbleToDropAid = (prop: {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
}) => {
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
                                Able To Drop Aid
                            </p>
                        </ModalHeader>
                        <ModalBody className="space-y-3"></ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
