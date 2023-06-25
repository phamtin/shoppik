/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
};

module.exports = nextConfig;
