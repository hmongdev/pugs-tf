/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http', // Use 'http' or 'https' depending on your local setup
				hostname: '127.0.0.1',
				port: '', // Leave empty if not using a specific port
			},
			{
				protocol: 'https',
				hostname: 'avatars.steamstatic.com',
			},
		],
	},
};

export default nextConfig;

