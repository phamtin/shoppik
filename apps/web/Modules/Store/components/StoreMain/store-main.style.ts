import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		flex: '1 1 auto',
		marginLeft: token.marginXL,
		marginTop: -token.margin,
		'@media screen and (max-width: 991.8px)': {
			marginLeft: token.marginXXL,
		},
	},
	wrapperThin: {
		width: 320,
		minWidth: 320,
	},
}));
