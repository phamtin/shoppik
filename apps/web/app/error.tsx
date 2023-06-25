'use client';

import { Col, Row, Space } from '@shoppik/ui/components/Core';

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = () => {
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
