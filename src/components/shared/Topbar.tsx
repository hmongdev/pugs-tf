'use client';

export default function Topbar() {
	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true"></div>
			<div className="absolute inset-0 bg-card" aria-hidden="true" />
		</nav>
	);
}
