import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
