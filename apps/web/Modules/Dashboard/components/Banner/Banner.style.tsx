import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	bannerWrapper: {
		position: 'relative',
		justifyContent: 'space-between',
		display: 'flex',
		height: 194,
		width: '100%',
		flexDirection: 'column',
		marginBottom: token.marginXXL,

		'.bannerBG': {
			borderRadius: token.borderRadiusLG * 3,
		},
		'.info': {
			position: 'absolute',
			height: '100%',
			padding: `${token.paddingLG}px`,
			display: 'flex',
			flexDirection: 'column',
			'.infoText': {
				marginBottom: 'auto',
			},
		},
		'@media screen and (max-width: 991.8px)': {
			height: 145,
			padding: '20px 18px',
		},

		'.title': {
			fontSize: token.fontSizeHeading2,
			color: token.colorBgBase,
			marginBottom: token.marginXS,

			'@media screen and (max-width: 991.8px)': {
				fontSize: token.fontSizeHeading4,
			},
		},
		'.desc': {
			fontSize: token.fontSizeHeading5,
			color: '#c1c1c1',
			marginBottom: 0,
		},
		'.button': {
			marginBottom: 0,
		},
	},
}));
