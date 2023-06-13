import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'column',

		h4: {
			marginTop: token.marginMD,
			marginBottom: token.marginXXS,
		},
		span: {
			marginBottom: token.marginLG,
		},
		'button.ant-btn-dangerous': {
			span: {
				fontSize: 15,
				fontWeight: 500,
			},
		},
	},
}));

export default styles;
