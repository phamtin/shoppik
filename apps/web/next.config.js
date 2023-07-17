/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@shoppik/ui', '@shoppik/schema'],
	experimental: {
		serverActions: true,
	},
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/trpc/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
					},
					{
						key: 'x-api',
						value: 'my other custom header value',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
