import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 56,
		padding: `0 ${token.paddingXL}px`,
		backgroundColor: token.colorBgBase,
		boxShadow: `1px 2px 8px ${token.colorBorder}`,

		'.left': {
			'.inputSearch': {
				display: 'flex',
				width: 480,
				'span.ant-input-affix-wrapper': {
					backgroundColor: token.colorBorderSecondary,
					marginRight: token.marginSM,
				},
			},
		},
	},
}));

export default styles;
