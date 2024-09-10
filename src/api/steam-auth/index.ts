'use server';

import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import SteamSignIn from 'steam-signin';
dotenv.config();

// Create a new SteamSignIn object
const realm = process.env.API_URL;
const signIn = new SteamSignIn(realm);

// Create an express app
const app = express();

// Let's set a port
const port = 3000;

// Set up the session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Spin up the server
app.listen(port, () => {
	console.log('Listening, port ' + port);
});

app.get('/api/v1/auth/steam', (req, res) => {
	res.statusCode = 302;
	res.setHeader('Location', signIn.getUrl(process.env.API_URL + '/api/v1/auth/steam/return'));
	res.end();
});

app.get('/api/v1/auth/steam/return', async (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	try {
		let steamId = await signIn.verifyLogin(req.url);

		const steamid64 = steamId.getSteamID64();
		const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamid64}`);
		const { avatarfull, personaname } = response.data.response.players[0];

		req.session.user = {
			steamid64,
			avatarfull,
			personaname,
		};
		await req.session.save();

		res.redirect(process.env.API_URL);
	} catch (error) {
		console.error(error);
		return res.status(500).send('There was an error signing in.');
	}
});

app.get('/', (req, res) => {
	const { user } = req.session;
	res.status(200).send(user);
});
