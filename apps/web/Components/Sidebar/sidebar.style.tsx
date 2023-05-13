import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		padding: token.paddingXXS,

		'li.ant-menu-item': {
			display: 'block',
			color: token.colorBorder,
			marginBottom: token.marginXS,
			border: `1px solid transparent`,
			transition: '0s',
			svg: { width: 20 },
			'&.ant-menu-item-selected': {
				color: token.colorBgBase,
				backgroundColor: `${token.colorPrimary} !important`,
				borderColor: `transparent !important`,
			},
			'&.ant-menu-item-active': {
				color: `${token.colorBgLayout} !important`,
				backgroundColor: `transparent`,
				border: `1px solid #5a5a5a`,
			},
		},

		'li.ant-menu-submenu': {
			color: token.colorBorder,
			svg: { width: '20px' },
			'&:hover': {
				'span, i, svg': {
					color: token.colorBorder,
				},
			},
		},

		'ul.ant-menu-vertical': {
			'li.ant-menu-item': {
				paddingTop: '3.5px !important',
			},
		},
	},
	logo: {
		marginTop: token.marginLG,
		marginLeft: token.marginSM,
	},
}));

export default styles;
