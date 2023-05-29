import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		width: '97%',
		maxWidth: 1920,
		margin: '22px auto 0 auto',

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

		'.floatAction': {
			position: 'absolute',
			right: 24,
			bottom: 100,
			width: 240,
			padding: token.paddingXS,
			borderRadius: token.borderRadiusLG,
			backgroundColor: '#FFF',
			boxShadow: '1px 3px 18px #c1c1c1',
		},
	},
}));
