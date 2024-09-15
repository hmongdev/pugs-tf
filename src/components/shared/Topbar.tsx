'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { SteamProfileType } from '@/types/steam';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FilterPlayers } from './FilterPlayers';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function Topbar() {
	const router = useRouter();
	const [steamProfile, setSteamProfile] = useState<SteamProfileType | null>(null);
	const [loading, setLoading] = useState(false);

	const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;
	const playersOnline = 10;

	const handleSteamLogin = () => {
		router.push(`/api/auth/steam?returnUrl=${encodeURIComponent(returnUrl)}`);
	};

	const handleSteamLogout = async () => {
		try {
			await fetch('/api/auth/steam/logout'); // Call the logout route
			router.push('/'); // Redirect to the home page or another desired route
			setSteamProfile(null);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const fetchProfile = async (steamId: string) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/steam-profile?steamId=${steamId}`);
			if (!response.ok) {
				throw new Error('Failed to fetch profile');
			}
			const data = await response.json();
			setSteamProfile(data.response.players[0]); // Adjust based on response structure
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
	}, []);

	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true" />
			<div className="absolute inset-0 bg-card" aria-hidden="true" />

			<div className="z-10 flex items-center justify-between gap-6 w-full">
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
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src={steamProfile.avatar} />
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										<Link href={`profile/${steamProfile.steamid}`}>Profile</Link>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<div onClick={handleSteamLogout}>Log out</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
