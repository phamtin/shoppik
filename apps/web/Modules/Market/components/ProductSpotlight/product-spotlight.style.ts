import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: token.marginLG,
		backgroundColor: 'white',
		boxShadow: 'rgba(0, 0, 0, 0.15) 2px 4px 28px 0px',
		borderRadius: token.borderRadiusLG * 2 - 4,

		'> .ant-row': {
			width: '100%',
		},

		img: {
			borderRadius: token.borderRadiusLG * 2 - 4,
		},

		'.productInfo': {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			padding: token.padding,
			paddingLeft: '9%',
			fontFamily: "'Poppins', sans-serif",
			'@media screen and (max-width: 991.8px)': {
				height: 'auto',
				paddingLeft: token.paddingMD,
			},

			'.productName': {
				fontWeight: 500,
				marginBottom: token.marginXXS,
			},
		},
	},
}));
