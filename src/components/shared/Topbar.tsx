'use client';

import { Button } from '../ui/button';

export default function Topbar() {
	const handleSteamLogin = () => {
		alert('Steam Login!');
	};

	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true"></div>
			<div className="absolute inset-0 bg-card" aria-hidden="false" />
			<Button className="z-10 text-gray-200" onClick={handleSteamLogin}>
				Steam Login
			</Button>
		</nav>
	);
}
