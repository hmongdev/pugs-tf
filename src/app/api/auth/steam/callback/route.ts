// Route for verifying Steam auth
import { verifyLogin } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const returnUrl = req.url; // Use req.url directly for verification

	try {
		if (!returnUrl) {
			throw new Error('Return URL is missing');
		}

		// Verify the login using the return URL
		const steamId = await verifyLogin(returnUrl);

		// Extract SteamID as a string
		const steamId64 = steamId.getSteamID64();

		// Clone and mutate the URL for redirection
		const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/?steamId=${steamId64}`);
		return NextResponse.redirect(redirectUrl);
	} catch (error) {
		console.error('Error during Steam authentication verification:', error);
		const errorRedirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=auth_failed`);
		return NextResponse.redirect(errorRedirectUrl);
	}
}
