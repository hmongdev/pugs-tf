// utility file that handles authentication flow
// How to setup Steam Login: https://www.npmjs.com/package/steam-signin

import SteamSignIn from 'steam-signin';
import SteamID from 'steamid'; // Import SteamID type
import { SteamProfile } from '../types/steam'; // Import SteamProfile interface

// New instance of `SteamSignIn`
const signIn = new SteamSignIn(process.env.NEXT_PUBLIC_BASE_URL as string);

// Helper function => Redirects user to authenticate
export async function getAuthUrl(returnUrl: string): Promise<string> {
	return signIn.getUrl(returnUrl);
}

// Helper function => Verifies login
export async function verifyLogin(returnUrl: string): Promise<SteamID> {
	return signIn.verifyLogin(returnUrl); // returns a `SteamID` object
}

// Helper function => Fetch profile data using Steam Web API
export async function getSteamProfile(steamId: string): Promise<SteamProfile> {
	const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`);

	if (!response.ok) {
		throw new Error('Steam Profile was not fetched!');
	}

	const data = await response.json();

	return data.response.players[0] as SteamProfile;
}
