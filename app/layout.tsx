import '@/styles/globals.css';
import { Metadata } from 'next';
import { Providers } from '../providers/next-ui';
import { siteConfig } from '@/config/site';
import Navigation from '@/components/Navigation';
import { QueryProviders } from '@/providers/QueryProvider';
import BackgroundMusic from '@/components/BackgroundMusic';
import { Suspense } from 'react';

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
                    <QueryProviders>
                        <div className="relative overflow-hidden flex flex-col h-screen">
                            <main className="flex flex-row w-full h-full py-5 pr-5 bg-white z-50">
                                {/* <BackgroundMusic /> */}
                                <Navigation />
                                <Suspense fallback={null}>{children}</Suspense>
                            </main>
                        </div>
                    </QueryProviders>
                </Providers>
            </body>
        </html>
    );
}
