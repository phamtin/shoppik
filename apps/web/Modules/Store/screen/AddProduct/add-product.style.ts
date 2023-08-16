//LG: 24, XL: 32, MD: 20, SM: 12, XS: 8, XXS: 4

import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		backgroundColor: '#F4F4F4',
		paddingTop: token.paddingSM,

		'.header': {
			margin: `0px ${token.paddingXL}px`,
			'.sub': {
				display: 'block',
				fontWeight: 400,
				color: token.colorTextDescription,
				marginBottom: token.margin,
			},
		},
		'.body': {
			display: 'flex',
			padding: `0px ${token.paddingXL}px`,
			marginBottom: token.marginLG,
			'.leftSection': {
				flex: '0 1 68%',
				backgroundColor: 'white',
				boxShadow: 'rgba(0, 0, 0, 0.1) 2px 4px 28px 0px',
				borderRadius: token.borderRadiusLG * 2 - 4,
				overflow: 'hidden',
				'@media screen and (max-width: 991.8px)': {
					flex: '0 1 44% !important',
				},
				'.infoWrapper': {
					padding: token.marginLG,
					backgroundColor: 'white',
					borderRadius: token.borderRadiusLG,
					'.title': {
						fontSize: 15,
						color: `${token.colorTextHeading}!important`,
					},
					'.info': {
						marginLeft: token.marginXL,
						'.ant-form-item-label': {
							paddingBottom: '2px',
							textAlign: 'left',
						},
					},
					'.ant-typography': {
						marginBottom: 0,
					},
					'.inputItem': {
						marginBottom: 0,
						span: {
							color: token.colorTextSecondary,
						},
					},
					'.spacer': {
						height: token.margin,
					},
				},
			},
			'.rightSection': {
				flex: '1 0',
				height: 900,
				background: token.colorBgBase,
				marginLeft: token.marginLG,
				padding: token.padding,
				borderRadius: token.borderRadiusLG * 2 - 4,
				boxShadow: ' rgba(0, 0, 0, 0.1) 2px 4px 15px 0px',
				'.ant-typography': {
					marginBottom: 0,
				},
			},
		},

		'.submitArea': {
			backgroundColor: 'white',
			padding: `${token.paddingLG}px ${token.paddingXL}px`,
		},
	},
}));
