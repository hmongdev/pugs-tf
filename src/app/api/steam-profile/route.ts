// Acts as a proxy to the Steam API
// Handles requests and data from Steam
// This avoids CORS issues by making the request from the server
import { NextResponse } from 'next/server';

const STEAM_API_KEY = process.env.STEAM_API_KEY;

export async function GET(request: Request) {
	const url = new URL(request.url);
	const steamId = url.searchParams.get('steamId');

	if (!steamId) {
		return NextResponse.json({ error: 'Invalid steamId' }, { status: 400 });
	}

	const apiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`;

	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error('Failed to fetch from Steam API');
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching Steam profile:', error);
		return NextResponse.json({ error: 'Failed to fetch Steam profile' }, { status: 500 });
	}
}
