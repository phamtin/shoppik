import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	becomeOwner: {
		height: 440,
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',

		h3: {
			marginTop: token.marginXXS,
			marginBottom: token.marginXS,
		},
		'.description': {
			color: token.colorTextSecondary,
			marginBottom: token.marginXL,
		},
	},
	leftBlock: {
		height: '100%',
		flex: '0 0 50%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',

		'.content': {
			textAlign: 'left',
			marginTop: -80,
			h4: {
				margin: 0,
			},
			h2: {
				marginTop: 0,
				span: {
					color: token.colorPrimary,
				},
			},
		},
		'.copyright': {
			color: token.colorTextTertiary,
			marginBottom: `-${token.margin}px`,
		},
	},
	rightBlock: {
		height: '100%',
		flex: '0 0 50%',

		'.imageWrapper': {
			height: '108%',
			margin: '-12px -16px 0 6px',
			borderRadius: token.borderRadiusLG,
			overflow: 'hidden',
		},
	},
}));

export default styles;
