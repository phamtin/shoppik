import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',

		'.cardTitle': {
			fontSize: token.fontSizeHeading3,
		},

		'.cardViewAll': {
			fontSize: token.fontSizeHeading5,
			color: token.colorTextDisabled,
		},
	},
}));
