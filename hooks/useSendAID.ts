import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import sendAIDValidate from '@/actions/home/sendAID.action';
import { useDisclosure } from '@nextui-org/modal';

export function useSendAID() {
    const searchParams = useSearchParams();
    const router = useRouter();
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

    // Checking the redirect for donorToken
    useEffect(() => {
        if (donorToken) {
            (async () => {
                const donor = await sendAIDValidate();
                if (donor.success) {
                    dropAIDModal.onOpen();
                }
                // Clear the query parameter
                const { pathname } = window.location;
                router.push(pathname);
            })();
        }
    }, [donorToken, router, dropAIDModal]);

    return {
        sendAID,
        donateFirstModal,
        dropAIDModal,
    };
}
