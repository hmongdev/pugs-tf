// Route for initiating Steam auth
import { getAuthUrl } from '@/lib/steam-signin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const returnUrl = searchParams.get('returnUrl') ?? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;

	const authUrl = await getAuthUrl(returnUrl);
	return NextResponse.redirect(authUrl);
}
