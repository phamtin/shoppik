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

		h4: {
			fontSize: token.fontSizeHeading5,
			marginTop: token.margin,
			marginBottom: token.marginSM,
		},
		'> span.ant-typography': {
			fontSize: 15,
			color: token.colorTextLabel,
			marginBottom: token.marginLG,
			lineHeight: 1.4,
		},
		'button.ant-btn-dangerous': {
			span: {
				display: 'block',
				fontSize: 13.6,
				fontWeight: 500,
			},
		},
	},
}));

export default styles;
