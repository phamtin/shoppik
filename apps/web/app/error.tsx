'use client';

import EmptyState from '@/Components/EmptyState/EmptyState';
import { useEffect } from 'react';

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<>
			<p>Uh oh.. Something went wrong!</p>
			<EmptyState />
		</>
	);
};

export default ErrorState;
