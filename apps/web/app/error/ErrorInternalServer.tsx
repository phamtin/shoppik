'use client';

import { Typography } from '@shoppik/ui/components/Core';

import { createStyles } from 'antd-style';
import { memo, useEffect, useState } from 'react';

function ErrorInternalServer({ code }: { code: string }) {
	const { styles } = useStyle();

	const [errorCode, setErrorCode] = useState('Something Went Wrong');

	useEffect(() => {
		if (code === 'UNAUTHORIZED') {
			setErrorCode('Access Denied');
		}

		if (code === 'FORBIDDEN') {
			setErrorCode('Access Denied');
		}
		if (code === 'BAD_REQUEST') {
			setErrorCode('Bad Request');
		}
		if (code === 'NOT_FOUND') {
			setErrorCode('Resource Not Found');
		}
		if (code === 'INTERNAL_SERVER_ERROR') {
			setErrorCode('Something Went Wrong');
		}
	}, [code]);

	return (
		<div className={styles.wrapper}>
			<div className="background">
				<Typography.Title level={4}>{errorCode}</Typography.Title>
				<Typography.Paragraph className="subtitle">No hack please!</Typography.Paragraph>
			</div>
		</div>
	);
}

export default memo(ErrorInternalServer);

const useStyle = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		marginTop: 340,
		marginLeft: `-${token.marginXL}px`,

		h4: {
			marginBottom: 0,
		},

		'.background': {
			width: 220,
			textAlign: 'center',
			padding: token.paddingLG,
			borderRadius: token.borderRadiusLG,
			boxShadow: 'rgba(0, 0, 0, 0.1) -1px 3px 30px -1px',
		},

		'div.subtitle': {
			fontSize: 14,
			fontWeight: 600,
			marginBottom: token.marginXXS,
			color: token.colorTextLabel,
		},
	},
}));
