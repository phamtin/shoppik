import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		'li.ant-menu-item': {
			display: 'block',
			color: token.colorBorder,
			border: `1px solid transparent`,
			transition: '0s',
			fontSize: 13,
			svg: { width: '18.6px', marginBottom: 3, color: '#FFF !important' },
			'.ant-menu-title-content': {
				marginLeft: token.marginSM,
			},
			'&.ant-menu-item-selected': {
				color: token.colorBgBase,
				backgroundColor: `${token['blue-6']} !important`,
				borderColor: `transparent !important`,
			},
			'&.ant-menu-item-active': {
				color: `${token.colorBgLayout} !important`,
				backgroundColor: `transparent`,
				border: `1px solid #5a5a5a`,
			},
		},

		'li.ant-menu-submenu': {
			fontSize: 13,
			color: token.colorBorder,
			svg: { width: '18.6px', marginLeft: 1, color: '#FFF !important' },
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
		display: 'flex',
		alignItems: 'end',
		marginTop: token.marginLG,
		marginLeft: token.marginSM,
		h4: {
			color: token.colorBgBase,
			marginBottom: 0,
			marginLeft: token.marginXXS,
		},
	},
}));

export default styles;
