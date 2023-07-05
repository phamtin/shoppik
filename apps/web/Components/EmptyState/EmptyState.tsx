import { Typography } from '@shoppik/ui/components/Core';
import Image from 'next/image';

function EmptyState() {
	return (
		<div style={{ marginLeft: '-60px' }}>
			<Image alt="empty" width={110} height={92} src="/images/empty.png" />
			<br />
			<Typography.Text style={{ color: '#b1b1b1' }}>&nbsp;No data</Typography.Text>
		</div>
	);
}

export default EmptyState;
