'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FilterPlayers } from './FilterPlayers';

export default function Topbar() {
	const { steamProfile, loading, login, logout, playersOnline } = useUserContext();

	return (
		<nav className="topbar">
			<div className="absolute -inset-px bg-gradient-to-r from-orange-700/60 via-red-500 to-yellow-500" aria-hidden="true" />
			<div className="absolute inset-0 bg-card" aria-hidden="true" />

			<div className="z-10 flex items-center justify-between gap-6 w-full">
				<div className="flex gap-1">
					<p className="text-2xl">{playersOnline >= 2 ? `${playersOnline} Players Online` : `${playersOnline} Player Online`}</p>
				</div>
				<div className="flex items-center gap-4">
					<FilterPlayers />
					{!steamProfile && !loading && (
						<Button variant="steam" onClick={login}>
							Login with Steam
						</Button>
					)}
					{steamProfile && (
						<div className="flex items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src={steamProfile.avatar} className="rounded-full" />
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										<Link href={`profile/${steamProfile.steamid}`}>Profile</Link>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<div onClick={logout}>Log out</div>
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
