import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 66,
		padding: '0 42px',
		backgroundColor: token.colorBgBase,
		boxShadow: `1px 2px 8px ${token.colorBorder}`,

		'.left': {
			'.inputSearch': {
				display: 'flex',
				width: 480,
				span: {
					backgroundColor: token.colorBgContainerDisabled,
					marginRight: token.marginSM,
				},
			},
		},
	},
}));

export default styles;
