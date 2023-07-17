import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		textAlign: 'center',
		flexDirection: 'column',

		'.profileImage': {
			marginTop: token.marginMD,
		},

		h3: {
			fontSize: 22,
			marginTop: token.margin,
			marginBottom: token.marginSM,
		},
		'> span.ant-typography': {
			fontWeight: 500,
			fontSize: 15,
			color: token.colorTextLabel,
			marginBottom: token.marginLG,
		},
		'button.ant-btn-dangerous': {
			span: {
				display: 'block',
				fontSize: 13.6,
				fontWeight: 500,
			},
		},
	},

	becomeOwner: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		flexDirection: 'column',

		h3: {
			marginTop: token.marginXXS,
			marginBottom: token.marginXS,
		},
		'.description': {
			fontSize: 15,
			color: token.colorTextSecondary,
			marginBottom: token.marginXL,
		},
	},

	formInfo: {
		h3: {
			marginBottom: 0
		},
		'.description': {
			fontSize: 15,
			marginBottom: token.marginXXL
		},
		'.ant-form-item': {
			marginBottom: token.marginMD
		},
		'.buttons': {
			display: 'flex',
			flexDirection: 'row',
			marginTop: token.marginXL
		}
	}
}));

export default styles;
