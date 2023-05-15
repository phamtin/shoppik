import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		'.info': {
			marginLeft: token.marginSM,

			'.action': {
				fontSize: token.fontSizeSM,
				color: token.colorTextDisabled,
				marginBottom: 0,
			},
			'.title': {
				marginTop: `-${token.marginXXS}px`,
				marginBottom: 0,
			},
		},
	},
}));
