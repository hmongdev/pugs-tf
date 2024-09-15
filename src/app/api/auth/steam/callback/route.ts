// Route for verifying Steam auth
import { verifyLogin } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

// Ensure the base URL is defined
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
	throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
}

export async function GET(req: NextRequest) {
	try {
		const returnUrl = req.url;

		if (!returnUrl) {
			throw new Error('Return URL is missing');
		}

		// Verify the login using the return URL
		const steamId = await verifyLogin(returnUrl);

		// Extract SteamID as a string
		const steamId64 = steamId.getSteamID64();

		// Redirect user to the home page with Steam ID
		return NextResponse.redirect(`${baseUrl}/?steamId=${steamId64}`);
	} catch (error) {
		console.error('Error during Steam authentication verification:', error);
		// Redirect to home page with error query parameter
		return NextResponse.redirect(`${baseUrl}/?error=auth_failed`);
	}
}
