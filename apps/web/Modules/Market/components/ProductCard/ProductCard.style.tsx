import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		borderRadius: 18,
		padding: 10,
		width: 196,
		minWidth: 196,
		marginBottom: 62,
		marginRight: token.marginXL,
		backgroundColor: 'white',
		boxShadow: ' rgba(0, 0, 0, 0.15) 2px 5px 15px 0px',
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

				'.metadata': {
					marginBottom: 0,
				},
			},
		},
		'.ant-card': {
			boxShadow: 'none',
			marginBottom: 0,
		},
	},
}));
