import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'.infoSection': {
			display: 'flex',
			'@media screen and (max-width: 1160px)': {
				justifyContent: 'space-between',
			},
			'.info': {
				marginLeft: token.marginSM,
				'@media screen and (max-width: 1160px)': {
					marginLeft: token.marginMD,
				},

				'.action': {
					fontSize: token.fontSizeHeading5,
					color: token.colorTextDisabled,
					marginBottom: 0,
				},
				'.title': {
					fontSize: `-${token.marginXXS}px`,
					marginBottom: 0,
				},
				'.rightChild': {
					display: 'none',
					'@media screen and (max-width: 1160px)': {
						display: 'inline',
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
		},
	},
}));
