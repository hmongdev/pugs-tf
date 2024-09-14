'use client';

import { Button } from '../ui/button';
import { FilterPlayers } from './FilterPlayers';

export default function Topbar() {
	const handleSteamLogin = () => {
		alert('Steam Login!');
	};

	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true" />
			<div className="absolute inset-0 bg-card" aria-hidden="true" />
			<div className="z-10 flex gap-6 text-white">
				<FilterPlayers />
				<Button variant="steam" onClick={handleSteamLogin}>
					Steam Login
				</Button>
			</div>
		</nav>
	);
}
