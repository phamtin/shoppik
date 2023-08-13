import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: token.paddingXXS,
		width: 80,
		minWidth: 80,
		height: 80,
		marginRight: token.marginXXS,
		textAlign: 'center',
		marginBottom: token.marginXXS,
		borderRadius: token.borderRadiusLG,
		border: `1px solid ${token.colorBgContainerDisabled}`,
		boxShadow: `1px 2px 12px ${token.colorTextDisabled}`,
		userSelect: 'none',
		cursor: 'pointer',
		'.ant-typography': { lineHeight: 1.4 },
	},
	selected: {
		boxShadow: `1px 2px 12px ${token['blue-4']}!important`,
		'.ant-typography': {
			lineHeight: 1.4,
			color: token['blue-6'],
		},
	},
}));

export default styles;
