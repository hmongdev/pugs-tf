'use client';

import { SteamProfileType } from '@/types/steam';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the shape of the UserContext
interface UserContextType {
	steamProfile: SteamProfileType | null;
	loading: boolean;
	login: () => void;
	logout: () => void;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [steamProfile, setSteamProfile] = useState<SteamProfileType | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;

	const login = () => {
		router.push(`/api/auth/steam?returnUrl=${encodeURIComponent(returnUrl)}`);
	};

	const logout = async () => {
		try {
			await fetch('/api/auth/steam/logout');
			setSteamProfile(null);
			router.push('/');
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
			setSteamProfile(data.response.players[0]);
		} catch (error) {
			console.error('Failed to fetch Steam profile:', error);
		} finally {
			setLoading(false);
		}
	};

	// Check for Steam ID in the URL on page load
	useEffect(() => {
		const url = new URL(window.location.href);
		const steamId = url.searchParams.get('steamId');
		if (steamId) {
			fetchProfile(steamId);
		}
	}, []);

	return <UserContext.Provider value={{ steamProfile, loading, login, logout }}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
