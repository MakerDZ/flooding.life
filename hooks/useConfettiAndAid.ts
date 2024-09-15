import { useDisclosure } from '@nextui-org/modal';
import { useRef } from 'react';
import useDropSupply from '@/hooks/useDropSupply';

export function useConfettiAndAid() {
    const confettiRef = useRef(null);
    const happeningModal = useDisclosure();
    const writeWishModal = useDisclosure();

    const { dropFood, showConfetti } = useDropSupply(confettiRef);

    return {
        confettiRef,
        happeningModal,
        dropFood,
        showConfetti,
        writeWishModal,
    };
}
