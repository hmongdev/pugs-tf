// this route handles logging out of Steam
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	// Redirect to the homepage
	const url = new URL('/', request.url);

	// Create a response object
	const response = NextResponse.redirect(url);

	// Clear the cookie by setting its expiration date in the past
	response.cookies.set('steamToken', '', {
		expires: new Date(0),
		path: '/', // Ensure this matches your cookie path
	});

	return response;
}
