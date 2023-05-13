import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		margin: '24px 42px 0 42px',

		'.title': {
			marginBottom: token.marginLG,
		},
		'.button': {
			display: 'flex',
			borderWidth: 2,
			borderColor: token.colorTextLabel,
			alignItems: 'center',
			'.paragraph': {
				marginBottom: 0,
				marginLeft: token.marginXS,
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
