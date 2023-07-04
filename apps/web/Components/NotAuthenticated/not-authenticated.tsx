import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		marginTop: 340,
		marginLeft: `-${token.marginXL}px`,

		h4: {
			marginBottom: 0,
		},

		'.background': {
			width: 220,
			textAlign: 'center',
			padding: token.paddingLG,
			borderRadius: token.borderRadiusLG,
			boxShadow: 'rgba(0, 0, 0, 0.1) -1px 3px 30px -1px',
		},

		'div.subtitle': {
			fontSize: 14,
			fontWeight: 600,
			marginBottom: token.marginXXS,
			color: token.colorTextLabel,
		},
	},
}));

export default styles;
