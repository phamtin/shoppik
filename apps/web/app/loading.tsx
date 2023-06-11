'use client';

import { Col, Row, Spin } from 'ui/components/Core';

const Loading = () => {
	return (
		<Row>
			<Col offset={11} style={{ marginTop: 200 }}>
				<Spin size="large" tip="How's your day?" />
			</Col>
		</Row>
	);
};

export default Loading;
