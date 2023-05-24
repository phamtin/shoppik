import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
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

		'.title': {
			fontSize: token.fontSizeHeading2,
			color: token.colorWhite,
			marginBottom: token.marginXS,
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
