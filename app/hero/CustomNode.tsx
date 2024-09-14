'use client';

import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import { memo } from 'react';

interface CustomNodeProps {
    data: {
        profile: string;
        name: string;
        username: string;
        desc: string;
    };
}

function CustomNode({ data }: CustomNodeProps) {
    return (
        <div className="w-[255px] h-[122px] bg-white rounded-lg shadow-md p-3">
            <div className="flex">
                <div className="rounded-full w-[30px] h-[30px] flex justify-center items-center bg-gray-100">
                    <Image
                        src={data.profile}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                </div>
                <div className="ml-2 flex flex-col">
                    <div className="text-[12px] font-bold">{data.name}</div>
                    <div className="text-[10px] text-[#B6B6B6]">
                        @{data.name}
                    </div>
                </div>
            </div>
            <p className="text-[10px] text-justify mt-2 text-[#454A55]">
                {data.desc}
            </p>
            <Handle
                type="target"
                position={Position.Top}
                className="w-16 !bg-teal-500"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-16 !bg-teal-500"
            />
        </div>
    );
}

export default memo(CustomNode);
