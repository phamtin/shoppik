import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: token.marginLG,
		backgroundColor: 'white',
		boxShadow: ' rgba(0, 0, 0, 0.15) 2px 4px 28px 0px',
		borderRadius: 18,

		'> .ant-row': {
			width: '100%',
		},

		'.productInfo': {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			padding: token.paddingMD,
			paddingLeft: '9%',
			fontFamily: "'Poppins', sans-serif",
			'@media screen and (max-width: 991.8px)': {
				height: 'auto',
				paddingLeft: token.paddingMD,
			},

			'.productName': {
				marginBottom: token.marginXXS,
			},
			'.productDesc': {
				lineHeight: 1.4,
				color: token.colorTextDescription,
			},
			'.productItemInfo': {
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: token.marginLG,
			},
			'.productMore': {
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: token.marginLG,
				'.productMoreItem': {
					display: 'flex',
					flexDirection: 'column',
					'.productMoreItemTitle': {
						fontSize: token.fontSizeSM,
						color: token.colorTextDisabled,
					},
					'.productMoreItemPrice': {
						fontSize: token.fontSizeHeading4,
						margin: 0,
					},
				},
			},

			'.productButton': {
				display: 'flex',
				justifyContent: 'center',
				alignSelf: 'end',
			},
		},
	},
}));
