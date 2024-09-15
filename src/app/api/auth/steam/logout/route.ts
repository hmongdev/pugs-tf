// This route handles logging out of Steam
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const url = request.nextUrl.clone();
	url.pathname = '/';
	url.host = process.env.NEXT_PUBLIC_BASE_URL as string; // Ensure to set the absolute host

	const response = NextResponse.rewrite(url);

	// Clear the cookie by setting its expiration date in the past
	response.cookies.set('steamToken', '', {
		expires: new Date(0),
		path: '/', // Adjust if you use a different path
	});

	return response;
}
