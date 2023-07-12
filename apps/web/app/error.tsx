'use client';

import { DefaultErrorShape } from '@trpc/server';
import { TRPCClientErrorBase } from '@trpc/client';
import NotAuthenticated from '@/Components/NotAuthenticated/NotAuthenticated';
import { Col, Row, Space } from '@shoppik/ui/components/Core';

interface ErrorStateProps {
	error: TRPCClientErrorBase<DefaultErrorShape>;
}

const GlobalError: React.FC<ErrorStateProps> = ({ error }: ErrorStateProps) => {
	if (error.data?.code === 'UNAUTHORIZED') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}
	if (error.data?.code === 'FORBIDDEN') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}
	if (error.data?.code === 'BAD_REQUEST') {
		return (
			<div>
				<NotAuthenticated />
			</div>
		);
	}
	if (error.data?.code === 'NOT_FOUND') {
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

export default GlobalError;
