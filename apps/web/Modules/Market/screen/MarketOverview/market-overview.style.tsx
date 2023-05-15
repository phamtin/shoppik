import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		margin: `${token.marginLG}px ${token.marginLG * 2}px 0 ${token.marginLG * 2}px`,

		'.title': {
			marginBottom: token.marginMD,
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
			marginTop: token.marginXL,
			display: 'flex',
			flexWrap: 'wrap',
		},
	},
}));
