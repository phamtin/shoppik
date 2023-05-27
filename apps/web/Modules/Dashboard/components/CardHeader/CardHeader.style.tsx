import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',

		'.cardTitle': {
			fontSize: token.fontSizeHeading3,
			'@media screen and (max-width: 1160px)': {
				fontSize: token.fontSizeHeading4,
			},
		},

		'.cardViewAll': {
			fontSize: token.fontSizeHeading5,
			color: token.colorTextDisabled,
			'@media screen and (max-width: 991.8px)': {
				fontSize: token.fontSizeSM,
			},
		},
	},
}));
