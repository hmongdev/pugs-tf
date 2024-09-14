// Route for verifying Steam auth
import { verifyLogin } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const returnUrl = req.url; // Use req.url directly for verification

	try {
		// Verify the login using the return URL
		const steamId = await verifyLogin(returnUrl);

		// Extract SteamID as a string
		const steamId64 = steamId.getSteamID64();

		// Redirect user to the home page with Steam ID
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?steamId=${steamId64}`);
	} catch (error) {
		// Handle errors (e.g., invalid login, etc.)
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=auth_failed`);
	}
}
