'use client';

import { Col, Row, Spin } from '@shoppik/ui/components/Core';

const Loading = () => {
	return (
		<Row>
			<Col offset={11} style={{ marginTop: 400 }}>
				<Spin size="large" />
			</Col>
		</Row>
	);
};

export default Loading;
