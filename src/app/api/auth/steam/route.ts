// Route for initiating Steam auth
import { getAuthUrl } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

// Ensure the base URL is defined
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
	throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		// Ensure returnUrl is an absolute URL
		const returnUrl = searchParams.get('returnUrl') ?? `${baseUrl}/api/auth/steam/callback`;

		const authUrl = await getAuthUrl(returnUrl);
		return NextResponse.redirect(authUrl);
	} catch (error) {
		console.error('Error during Steam auth initiation:', error);
		return NextResponse.json({ error: 'Failed to initiate Steam authentication' }, { status: 500 });
	}
}
