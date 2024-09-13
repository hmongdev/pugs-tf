'use client';

import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<nav className="bg-card p-4 border-b border-ring/30">
			<div className="flex gap-2 justify-between">
				<h1 className="font-semibold text-2xl text-destructive">TF2pugs</h1>
				<Button>Sign In</Button>
			</div>
		</nav>
	);
}