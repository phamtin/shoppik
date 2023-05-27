import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		margin: `${token.marginLG}px ${token.marginLG * 2}px 0 ${token.marginLG * 2}px`,

		'.title': {
			marginBottom: token.marginMD,
		},

		'.buttonFilter': {
			display: 'flex',
			borderWidth: 1,
			borderColor: token.colorTextTertiary,
			alignItems: 'center',
			'.paragraph': {
				marginBottom: 0,
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
