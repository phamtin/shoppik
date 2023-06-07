import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		padding: `${token.paddingContentHorizontalLG}px ${token.paddingContentHorizontalSM}px`,
		backgroundColor: token.colorBgBase,
		boxShadow: `1px 2px 8px ${token.colorBorder}`,
		borderRadius: token.borderRadiusOuter * 3,
		marginBottom: token.marginXL,
	},
}));
