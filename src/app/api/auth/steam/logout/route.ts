// this route handles logging out of Steam
import { NextResponse } from 'next/server';

export async function GET() {
	// Create a response object
	const response = NextResponse.rewrite('/');

	// Clear the cookie by setting its expiration date in the past
	response.cookies.set('steamToken', '', {
		expires: new Date(0),
		path: '/', // Adjust if you use a different path
	});

	return response;
}
