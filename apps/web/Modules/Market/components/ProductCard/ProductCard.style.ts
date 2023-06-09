import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		borderRadius: token.borderRadius * 2,
		padding: token.paddingXS,
		paddingBottom: token.paddingXXS,
		width: 186,
		minWidth: 162,
		marginBottom: token.marginXXL,
		marginRight: token.marginXL,
		backgroundColor: 'white',
		boxShadow: ' rgba(0, 0, 0, 0.15) 2px 4px 15px 0px',

		'.ant-card-body': {
			padding: `0px 0px ${token.paddingXXS}px 0`,
			'.title': {
				fontSize: token.fontSizeHeading5,
				marginTop: token.marginXXS,
				marginBottom: token.marginXXS,
			},
			'.desc': {
				fontSize: token.fontSizeSM,
				color: token.colorTextDescription,
			},
			'.price': {
				fontSize: token.fontSize,
				margin: 0,
			},
			'.cardInfo': {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',

				'.metadata': { marginBottom: 0 },
			},
		},
		'.ant-card': {
			boxShadow: 'none',
			marginBottom: 0,
		},
		'.ant-card-cover': {
			borderRadius: token.borderRadiusLG + 2,
			overflow: 'hidden',
			'> span': {
				overflow: 'hidden',
			},
		},
		':hover': {
			cursor: 'pointer',
		},
	},
}));
