import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		marginBottom: token.marginSM,
		span: {
			fontSize: token.fontSizeHeading5,
			marginBottom: token.marginXXS - 2,
		},
	},
}));
