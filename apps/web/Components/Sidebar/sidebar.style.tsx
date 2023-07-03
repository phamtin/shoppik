import { SiderProps } from '@shoppik/ui/components/Core';
import { createStyles } from 'antd-style';

const styles = createStyles(({ token }, props: SiderProps) => ({
	wrapper: {
		position: 'relative',
		transition: '0s',
		padding: token.paddingXXS,
		fontWeight: 500,

		'.ant-segmented': {
			position: 'absolute',
			bottom: 60,
		},

		'li.ant-menu-item': {
			display: 'block',
			color: '#969696',
			fontSize: 13,
			transition: '0s !important',
			border: `1px solid transparent`,
			marginBottom: `0px !important`,
			marginTop: `0px !important`,
			borderRadius: token.borderRadiusOuter * 2,
			svg: {
				width: '18.6px',
				marginBottom: 2,
				color: token.colorBgLayout,
			},
			'&.ant-menu-item-selected': {
				color: `${token.blue5} !important`,
				backgroundColor: `#0a0a0a !important`,
				border: `2px solid ${token.blue6} !important`,
				'&:hover': {
					color: `${token.colorBgBase} !important`,
					backgroundColor: `inherit !important`,
				},
			},
			'&.ant-menu-item-active': {
				color: `${token.colorBgBase} !important`,
			},
		},

		'li.ant-menu-submenu': {
			transition: '0s',
			fontSize: 13,
			color: '#969696',
			svg: { width: '18.6px', marginLeft: 1, color: `${token.colorBgLayout} !important` },
			'&:hover': {
				'span, i, svg': {
					color: '#969696',
				},
			},
		},

		'ul.ant-menu-vertical': {
			'li.ant-menu-item': {
				marginBottom: `0px !important`,
				marginTop: `0px !important`,
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
		marginTop: props.collapsed ? 0 : 0,
		marginLeft: props.collapsed ? token.marginXS - 1 : token.marginSM,
		h4: {
			color: token.colorBgBase,
			marginBottom: '0px !important',
			marginLeft: token.marginXXS,
		},
	},
}));

export default styles;
