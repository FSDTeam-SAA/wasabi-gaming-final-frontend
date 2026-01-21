import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
    title: 'Wasabi Gaming Client',
    description: 'Wasabi Gaming Integration Client',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
