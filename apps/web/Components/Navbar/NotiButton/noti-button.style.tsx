import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		padding: token.paddingXXS,
		marginTop: token.margin,

		button: {
			backgroundColor: token.orange1,
			svg: {
				color: token.orange6,
				marginTop: 2,
			},
			'&:hover': {
				backgroundColor: `${token.orange2}!important`,
			},
		},

		'li.ant-menu-item': {
			display: 'block',
			paddingLeft: token.paddingSM,
			marginBottom: token.marginXS,
			border: `1px solid transparent`,

			'&.ant-menu-item-selected': {
				color: `${token.colorBgLayout}`,
				backgroundColor: `${token.colorPrimary}`,
				borderColor: 'transparent',
			},
			'&.ant-menu-item-active': {
				color: token.colorBgLayout,
				backgroundColor: `transparent`,
				border: `1px solid ${token.colorBgLayout}`,
			},
		},
	},

	logo: {
		marginTop: token.marginLG,
		marginLeft: token.marginSM,
	},

	notiDropdown: {
		height: 'calc(100vh - 60px)',
		backgroundColor: token.colorBgContainer,
		boxShadow: `1px 3px 18px ${token.colorBorder}`,
		borderRadius: token.borderRadiusLG,
		paddingTop: token.padding,
		'.ant-segmented': {
			backgroundColor: 'transparent',
		},
		'.ant-segmented-item': {
			backgroundColor: 'transparent',
			border: '1px solid transparent',
		},
		'.ant-segmented-thumb': {
			color: token.geekblue6,
			backgroundColor: token.geekblue6,
			border: `1px solid ${token.geekblue7}`,
			boxShadow: `0px 1px 8px ${token.geekblue6}`,
		},
		'.ant-segmented-item-selected': {
			color: token.colorBgBase,
			border: `1px solid ${token.geekblue7}`,
			boxShadow: `0 1px 8px ${token.geekblue6}`,
			'.ant-segmented-item-label': {
				color: token.colorBgBase,
				backgroundColor: token.geekblue6,
			},
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: 410,
		height: 86,
		marginLeft: token.marginXS,
		marginRight: token.marginXS,
		marginBottom: token.marginSM,
		backgroundColor: token.cyan10,
		borderRadius: token.borderRadiusLG,
		h5: {
			color: token.colorBgBase,
			margin: 0,
		},
		span: {
			color: token.colorBorder,
			margin: 0,
			strong: {
				color: token.green6,
			},
		},
		'.markRead': {
			cursor: 'pointer',
		},
	},

	content: {
		display: 'flex',
		flexDirection: 'column',
		height: 'calc(100% - 144px)',
		padding: token.paddingXXS,
		paddingTop: token.paddingXS,
		justifyContent: 'space-between',
		button: {
			marginTop: 'auto',
		},
		'.notiList': {
			overflow: 'auto',
		},
		'.loadmoreList': {
			li: {
				display: 'block',
				padding: token.paddingSM,
				paddingTop: token.paddingXXS,
				paddingBottom: token.paddingXXS,
				cursor: 'pointer',
				borderRadius: token.borderRadius,
				border: 'none',
				'&:hover': {
					backgroundColor: token.colorBgTextHover,
				},
			},
		},
	},
}));

export default styles;
