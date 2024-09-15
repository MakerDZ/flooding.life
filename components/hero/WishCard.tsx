'use client';

import Image from 'next/image';
import { memo } from 'react';

interface CustomNodeProps {
    data: {
        id: string;
        heroName: string;
        heroPfp: string;
        letter: string;
        socialLink: string;
        donorId: string | null;
        createdAt: Date;
    };
}

function CustomNode({ data }: CustomNodeProps) {
    return (
        <div className="max-w-[255px] min-w-[255px] max-h-[122px] min-h-[122px] bg-white rounded-lg shadow-md p-3">
            <div className="flex">
                <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-gray-100">
                    <Image
                        src={data.heroPfp}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                </div>
                <div className="ml-2 flex flex-col">
                    <div className="text-[12px] font-bold">{data.heroName}</div>
                    <div className="text-[10px] text-[#B6B6B6]">
                        @{data.heroName}
                    </div>
                </div>
            </div>
            <p className="text-[10px] text-justify mt-2 text-[#454A55]">
                {data.letter}
            </p>
        </div>
    );
}

export default memo(CustomNode);
