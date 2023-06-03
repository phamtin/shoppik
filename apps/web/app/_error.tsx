/**
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import * as Sentry from '@sentry/nextjs';
import type { NextPage } from 'next';
import type { ErrorProps } from 'next/error';
import NextErrorComponent from 'next/error';

const CustomErrorComponent: NextPage<ErrorProps> = ({ statusCode }) => (
	<NextErrorComponent statusCode={statusCode} />
);

CustomErrorComponent.getInitialProps = async (contextData) => {
	// In case this is running in a serverless function, await this in order to give Sentry
	// time to send the error before the lambda exits
	await Sentry.captureUnderscoreErrorException(contextData);

	// This will contain the status code of the response
	return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
