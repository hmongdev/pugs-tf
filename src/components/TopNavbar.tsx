'use client';

import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<nav className="bg-black p-4">
			<div className="flex gap-2 justify-end">
				<Button>Sign In</Button>
			</div>
		</nav>
	);
}