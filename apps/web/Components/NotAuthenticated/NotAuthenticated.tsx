'use client';

import { Typography } from '@shoppik/ui/components/Core';

import useStyle from './not-authenticated';

function NotAuthenticated() {
	const { styles } = useStyle();

	return (
		<div className={styles.wrapper}>
			<div className="background">
				<Typography.Title level={4}>Access Denied</Typography.Title>
				<Typography.Paragraph className="subtitle">No hack please!</Typography.Paragraph>
			</div>
		</div>
	);
}

export default NotAuthenticated;
