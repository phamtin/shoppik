/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@shoppik/ui', '@shoppik/schema'],
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
};

module.exports = nextConfig;
