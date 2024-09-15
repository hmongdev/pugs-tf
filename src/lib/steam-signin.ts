// utility file that handles authentication flow
// How to setup Steam Login: https://www.npmjs.com/package/steam-signin

import { SteamProfileType } from '@/types/steam';
import SteamSignIn from 'steam-signin';
import SteamID from 'steamid'; // Import SteamID type

// Ensure the base URL is defined
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
	throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
}

// New instance of `SteamSignIn`
const signIn = new SteamSignIn(baseUrl);

// Helper function => Redirects user to authenticate
export async function getAuthUrl(returnUrl: string): Promise<string> {
	try {
		// Ensure returnUrl is an absolute URL
		return signIn.getUrl(returnUrl);
	} catch (error) {
		console.error('Error generating auth URL:', error);
		throw error;
	}
}

// Helper function => Verifies login
export async function verifyLogin(returnUrl: string): Promise<SteamID> {
	try {
		return await signIn.verifyLogin(returnUrl);
	} catch (error) {
		console.error('Error verifying login:', error);
		throw error;
	}
}

// Helper function => Fetch profile data using Steam Web API
export async function getSteamProfile(steamId: string): Promise<SteamProfileType> {
	try {
		const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`);

		if (!response.ok) {
			throw new Error('Steam Profile was not fetched!');
		}

		const data = await response.json();

		return data.response.players[0] as SteamProfileType;
	} catch (error) {
		console.error('Error fetching Steam profile:', error);
		throw error;
	}
}
