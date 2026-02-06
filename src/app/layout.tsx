import './globals.css';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google'
import Providers from './providers';
import { Toaster } from 'sonner';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
    title: 'Wasabi Gaming Client',
    description: 'Wasabi Gaming Integration Client',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
    variable: '--font-source-sans',
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={sourceSans.className}>
                <Providers>
                    {children}
                    <Toaster />
                    <ScrollToTop />
                </Providers>
            </body>
        </html>
    );
}
