import '@/styles/globals.css';
import { Metadata } from 'next';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body className="min-h-screen font-nunito">
                <Providers>
                    <div className="relative flex flex-col h-screen">
                        <main className="flex flex-row w-full h-full py-5 pr-5 bg-white z-50">
                            <Navigation />
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
