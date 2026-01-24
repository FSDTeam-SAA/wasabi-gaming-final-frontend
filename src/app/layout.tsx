import './globals.css';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google'
import Providers from './providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'Wasabi Gaming Client',
    description: 'Wasabi Gaming Integration Client',
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
                <Providers>{children}

                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
