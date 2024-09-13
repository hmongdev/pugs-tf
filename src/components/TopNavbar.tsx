'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function TopNavbar() {
	// Hooks
	const router = useRouter();

	// Functions
	const handleCreatePug = () => {
		router.push('/create-pug');
	};

	return (
		<nav className="bg-card p-4 border-b border-ring/30">
			<div className="flex gap-2 justify-between">
				<h1 className="font-semibold text-2xl text-destructive">TF2pugs</h1>
				<Button onClick={handleCreatePug}>Create Pug</Button>
			</div>
		</nav>
	);
}