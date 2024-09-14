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

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        path: string
    ) => {
        if (e.key === 'Enter' || e.key === ' ') {
            navigateTo(path);
        }
    };

    return (
        <nav className="h-full w-[69px] z-10 space-y-9 py-2">
            {navigation.map((Navi, index) => (
                <div
                    key={index}
                    aria-label={`Navigate to ${Navi.path}`}
                    className={`flex flex-row justify-center cursor-pointer ${pathname == Navi.path ? 'text-[#5E5459]' : 'text-[#9AA4B4]'}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigateTo(Navi.path)}
                    onKeyDown={(e) => handleKeyDown(e, Navi.path)}
                >
                    {Navi.icon}
                </div>
            ))}
        </nav>
    );
};

export default Navigation;
