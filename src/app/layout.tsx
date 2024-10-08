import Topbar from '@/components/shared/Topbar';
import { ClassProvider } from '@/context/ClassContext';
import { UserProvider } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { BioRhyme, Open_Sans } from 'next/font/google';
import './globals.css';

// Custom Fonts
const fontHeading = BioRhyme({ subsets: ['latin'], weight: ['400'], variable: '--font-heading' });
const fontBody = Open_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
	title: 'pugs-tf',
	description: '#1 TF2 pugging website',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<UserProvider>
			<ClassProvider>
				<html lang="en">
					<body className={cn('antialiased dark h-screen bg-background text-white', fontBody.variable, fontHeading.variable)}>
						<Topbar />
						<main className="main">{children}</main>
					</body>
				</html>
			</ClassProvider>
		</UserProvider>
	);
}
