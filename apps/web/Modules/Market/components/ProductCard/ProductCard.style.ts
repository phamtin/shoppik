import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		borderRadius: token.borderRadiusLG * 2,
		padding: token.paddingSM - 2,
		width: 190,
		minWidth: 190,
		marginBottom: token.marginXXL,
		marginRight: token.marginXL,
		backgroundColor: 'white',
		boxShadow: ' rgba(0, 0, 0, 0.15) 2px 4px 15px 0px',
		'.ant-card-body': {
			padding: `${token.paddingXS}px 0 ${token.paddingXXS}px 0`,
			'.title': {
				fontSize: token.fontSizeLG,
				marginBottom: token.marginXS,
			},
			'.desc': {
				fontSize: token.fontSizeSM,
				color: token.colorTextDescription,
			},
			'.price': {
				fontSize: 12,
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
			'> span': {
				borderRadius: token.borderRadiusSM * 2 + 2,
				overflow: 'hidden',
			},
		},
		':hover': {
			cursor: 'pointer',
		},
	},
}));
