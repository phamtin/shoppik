import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	bannerWrapper: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		height: 194,
		width: '100%',
		borderRadius: 24,
		padding: '30px 28px',
		justifyContent: 'space-between',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: token.marginXXL,
		'@media screen and (max-width: 991.8px)': {
			height: 145,
			padding: '20px 18px',
		},

		'.title': {
			fontSize: token.fontSizeHeading2,
			color: token.colorWhite,
			marginBottom: token.marginXS,

			'@media screen and (max-width: 991.8px)': {
				fontSize: token.fontSizeHeading4,
			},
		},
		'.desc': {
			fontSize: token.fontSizeHeading5,
			color: '#D4D4D4',
			marginBottom: 0,
		},
		'.button': {
			marginBottom: 0,
		},
	},
}));
