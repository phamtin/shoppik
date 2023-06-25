'use client';

import NotAuthenticated from '@/Components/NotAuthenticated/NotAuthenticated';
import { Col, Row, Space } from '@shoppik/ui/components/Core';

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
	console.log('error = ', error);

	if (error.message === 'UNAUTHORIZED') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}
	if (error.message === '429') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}
	if (error.message === '400') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}

	return (
		<Row>
			<Col offset={9}>
				<Space align="center" direction="vertical">
					<p>Uh oh.. Something went wrong 🥶</p>
				</Space>
			</Col>
		</Row>
	);
};

export default ErrorState;
