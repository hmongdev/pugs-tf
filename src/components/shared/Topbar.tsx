'use client';

import { getSteamProfile } from '@/lib/steam-signin'; // Import the helper function
import { SteamProfileType } from '@/types/steam'; // Import SteamProfile type
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FilterPlayers } from './FilterPlayers';

export default function Topbar() {
	// Hooks
	const router = useRouter();

	// States
	const [steamProfile, setSteamProfile] = useState<SteamProfileType | null>(null);
	const [loading, setLoading] = useState(false);

	// Constants
	const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;
	const playersOnline = 10;

	// Functions
	const handleSteamLogin = () => {
		// GET => Steam Auth
		router.push(`/api/auth/steam?returnUrl=${encodeURIComponent(returnUrl)}`);
	};

	// GET => Steam Profile Data
	const fetchProfile = async (steamId: string) => {
		setLoading(true);
		try {
			const profile = await getSteamProfile(steamId);
			setSteamProfile(profile);
		} catch (error) {
			console.error('Failed to fetch Steam profile:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const steamId = url.searchParams.get('steamId');
		if (steamId) {
			fetchProfile(steamId);
		}
	}, []); // Run only on component mount

	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true" />
			<div className="absolute inset-0 bg-card" aria-hidden="true" />

			<div className="z-10 flex items-center justify-between gap-6 text-white w-full">
				<div className="flex gap-1">
					<p className="text-2xl">{playersOnline} Players Online</p>
				</div>
				<div className="flex gap-6">
					<FilterPlayers />
					{!steamProfile && !loading && (
						<Button variant="steam" onClick={handleSteamLogin}>
							Login with Steam
						</Button>
					)}
					{steamProfile && (
						<div className="flex items-center gap-2">
							<Image
								src={steamProfile.avatar}
								width={100}
								height={100}
								alt={`${steamProfile.personaname}'s profile picture`}
								className="w-10 h-10 rounded-full"
							/>
							<span>{steamProfile.personaname}</span>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
