import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: token.marginMD,

		'.ant-typography': {
			marginBottom: 0,
		},

		'.cardTitle': {
			fontSize: token.fontSizeHeading4,
		},

		'.cardViewAll': {
			fontSize: token.fontSizeHeading5,
			color: token.colorTextDisabled,
		},
	},
}));
