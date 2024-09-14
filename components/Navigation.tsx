'use client';
import { GoHomeFill } from 'react-icons/go';
import { FaStar } from 'react-icons/fa6';
import { LuRadioTower } from 'react-icons/lu';
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
    {
        path: '/',
        icon: <GoHomeFill size={33} />,
    },
    {
        path: '/hero',
        icon: <FaStar size={33} />,
    },
    {
        path: '/reports',
        icon: <LuRadioTower size={33} />,
    },
];

const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <nav className="h-full w-[69px] bg-white z-10 space-y-9 py-2">
            {navigation.map((Navi, index) => (
                <div
                    onClick={() => {
                        navigateTo(Navi.path);
                    }}
                    key={index}
                    className={`flex flex-row justify-center cursor-pointer ${pathname == Navi.path ? 'text-[#5E5459]' : 'text-[#9AA4B4]'}`}
                >
                    {Navi.icon}
                </div>
            ))}
        </nav>
    );
};

export default Navigation;
