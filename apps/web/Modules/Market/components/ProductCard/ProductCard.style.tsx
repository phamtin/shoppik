import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		borderRadius: 16,
		padding: 10,
		width: 196,
		height: 280,
		marginBottom: 62,
		marginRight: token.marginXL,
		backgroundColor: 'white',
		boxShadow: `8px 4px 28px ${token.colorFill}`,
		'.ant-card-body': {
			padding: 0,
			'.title': {
				fontSize: 14,
				margin: '12px 0',
			},
			'.desc': {
				fontSize: 10,
				marginBottom: 0,
			},
			'.price': {
				fontSize: 12,
				margin: 0,
			},
		},
		'.ant-card': {
			boxShadow: 'none',
			marginBottom: 0,
		},
	},
	imageCard: {
		borderRadius: 6,
	},
}));
