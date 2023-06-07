import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',

		'.infoSection': {
			display: 'flex',

			'.info': {
				marginLeft: token.marginSM,

				'.action': {
					fontSize: token.fontSizeHeading5,
					color: token.colorTextBase,
					marginBottom: 0,
					lineHeight: 1.2,

					'@media screen and (max-width: 1160px)': {
						fontSize: token.fontSizeHeading5 - 2,
					},
				},
				'.title': {
					fontSize: token.fontSizeHeading5 - 2,
					color: token.colorTextDescription,
					marginBottom: 2,
					marginTop: -2,

					'@media screen and (max-width: 1160px)': {
						fontSize: token.fontSizeHeading5 - 4,
					},
				},
				'.rightChild': {
					display: 'none',
					'.ant-typography': {
						marginBottom: 0,
					},
					'.rightSection': {
						display: 'flex',
						// alignItems: 'center',
					},
					'@media screen and (max-width: 1160px)': {
						display: 'flex',
					},
				},
			},
		},

		'.rightChildOutside': {
			'@media screen and (max-width: 1160px)': {
				display: 'none',
			},

			'.ant-typography': {
				marginBottom: 0,
			},

			'.rightSection': {
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
			},
		},
	},
}));
