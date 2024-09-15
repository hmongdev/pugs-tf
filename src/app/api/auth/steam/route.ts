// Route for initiating Steam auth
import { getAuthUrl } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const returnUrl = searchParams.get('returnUrl') ?? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;

	try {
		const authUrl = await getAuthUrl(returnUrl);

		// Clone and mutate the URL for redirection
		const redirectUrl = new URL(authUrl);
		return NextResponse.redirect(redirectUrl);
	} catch (error) {
		console.error('Error generating auth URL:', error);
		const errorRedirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=auth_failed`);
		return NextResponse.redirect(errorRedirectUrl);
	}
}
