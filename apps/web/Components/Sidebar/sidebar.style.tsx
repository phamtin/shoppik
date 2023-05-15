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
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 0,
				'span.ant-menu-title-content': {
					display: 'none',
				},
			},
		},
	},
	logo: {
		marginTop: token.marginLG,
		marginLeft: token.marginXS - 1,
	},
}));

export default styles;
