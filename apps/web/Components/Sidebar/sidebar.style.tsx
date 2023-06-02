import { SiderProps } from 'ui/components/Core';
import { createStyles } from 'antd-style';

const styles = createStyles(({ token }, props: SiderProps) => ({
	wrapper: {
		position: 'relative',
		transition: '0s',
		padding: token.paddingXXS,

		'li.ant-menu-item': {
			display: 'block',
			color: '#969696',
			fontSize: 13,
			transition: '0s',
			border: `1px solid transparent`,
			marginBottom: `${token.marginXXS}px !important`,
			borderRadius: token.borderRadiusOuter * 3,
			svg: {
				width: '18.6px',
				marginBottom: 2,
				color: token.colorBgLayout,
			},
			'&.ant-menu-item-selected': {
				color: `${token.colorBgBase} !important`,
				backgroundColor: `#1e2536 !important`,
				borderColor: `transparent !important`,
			},
			'&.ant-menu-item-active': {
				color: '#969696!important',
				backgroundColor: `transparent`,
				border: `1px solid #5a5a5a`,
			},
		},

		'li.ant-menu-submenu': {
			transition: '0s',
			fontSize: 13,
			color: '#969696',
			svg: { width: '18.6px', marginLeft: 1, color: `${token.colorBgLayout} !important` },
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
		marginLeft: props.collapsed ? token.marginXS : token.marginSM,
		h4: {
			color: token.colorBgBase,
			marginBottom: 0,
			marginLeft: token.marginXXS,
		},
	},
}));

export default styles;
