'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import ErrorInternalServer from './ErrorInternalServer';
import removeAuthCookie from '../action';

interface ErrorStateProps {
	error:
		| {
				code: string;
		  }
		| null
		| undefined;
}

const GlobalError: React.FC<ErrorStateProps> = ({
	error = { code: 'INTERNAL_SERVER_ERROR' },
}: ErrorStateProps) => {
	const { update } = useSession();

	useEffect(() => {
		if (error?.code === 'UNAUTHORIZED') {
			removeAuthCookie();
		}
		return () => {
			update(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <ErrorInternalServer code={error!.code} />;
};

export default GlobalError;
