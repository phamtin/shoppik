import {createStyles} from 'antd-style';

export default createStyles(({token}) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'.infoSection': {
			display: 'flex',

			'.info': {
				marginLeft: token.marginSM,

				'.action': {
					fontSize: token.fontSizeHeading5,
					color: token.colorTextDisabled,
					marginBottom: 0,
				},
				'.title': {
					fontSize: `-${token.marginXXS}px`,
					marginBottom: 0,
				},
			},
		},

		'rightSection': {
			backgroundColor: 'red',
		},

		'.ant-typography': {
			marginBottom: 0,
		},
	},
}));
