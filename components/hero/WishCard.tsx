'use client';

import { memo } from 'react';
import Avatar from 'boring-avatars';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useDisclosure } from '@nextui-org/modal';
import { FullWishTextModal } from './FullWishTextModal';

interface CustomNodeProps {
    data: {
        id: string;
        heroName: string;
        heroPfp: string;
        letter: string;
        socialLink: string;
        donorId: string;
        createdAt: string;
    };
}

function CustomNode({ data }: CustomNodeProps) {
    const FullWishModal = useDisclosure();

    return (
        <>
            <div className="max-w-[255px] min-w-[255px] max-h-[122px] min-h-[122px] bg-white rounded-lg shadow-md p-3 flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-gray-100">
                            <Avatar name={data.id} variant="beam" size={30} />
                        </div>
                        <div className="ml-2 flex flex-col">
                            <div className="text-[12px] font-bold">
                                {data.heroName}
                            </div>
                            <div className="text-[10px] text-[#B6B6B6]">
                                @{data.heroName}
                            </div>
                        </div>
                    </div>
                    <FaExternalLinkAlt
                        onClick={() => {
                            window.open(data.socialLink, '_blank');
                        }}
                        size={10}
                    />
                </div>
                <button
                    onClick={FullWishModal.onOpen}
                    className="text-[10px] text-justify mt-2 text-[#454A55] line-clamp-4 w-full flex-1"
                >
                    <p className="w-full h-full">{data.letter}</p>
                </button>
            </div>
            <FullWishTextModal
                isOpen={FullWishModal.isOpen}
                onOpenChange={FullWishModal.onOpenChange}
                data={data}
            />
        </>
    );
}

export default memo(CustomNode);
