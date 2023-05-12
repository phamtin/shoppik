import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		marginLeft: 48,
		marginRight: 48,

		'.title': {
			fontSize: '40px',
			marginBottom: 40,
		},

		'.button': {
			display: 'flex',
			borderWidth: 2,
			borderColor: token.colorTextLabel,
			alignItems: 'center',
			'.paragraph': {
				marginBottom: 0,
				marginLeft: 8,
				fontSize: 14,
			},
			':hover': {
				color: token.colorTextLabel,
				borderColor: token.colorTextLabel,
				backgroundColor: token.colorBgLayout,
			},
		},

		'.productWrapper': {
			marginTop: 48,
			display: 'flex',
			flexWrap: 'wrap',
		},
	},
}));
