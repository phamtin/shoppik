import { createStyles } from 'antd-style';

export default createStyles(({ token }, state: { collapsed: boolean }) => ({
	wrapper: {
		width: state.collapsed ? 0 : 354,
		height: 'calc(100vh - 100px)',
		position: 'relative',
		padding: state.collapsed ? `${token.padding}px ${token.paddingXS}px` : token.padding,
		borderRadius: state.collapsed ? token.borderRadius : token.borderRadius * 2,
		overflowY: 'auto',
		boxShadow: 'rgba(0, 0, 0, 0.15) -1px 3px 17px 0px',
		transition: '0.3s',
		overflowX: 'hidden',
		background: token.colorBgBase,

		'.collapeBtn': {
			position: 'absolute',
			top: 384,
			right: state.collapsed ? -10 : -6,
			border: state.collapsed ? 'none' : `1px solid ${token.colorTextPlaceholder}`,
			span: {
				marginRight: 4,
				marginTop: -1,
			},
		},

		'@media screen and (max-width: 991.8px)': {
			position: 'absolute',
			zIndex: 2,
		},
	},
	wrapperThin: {
		display: state.collapsed ? 'none' : 'block',
		width: 320,
		minWidth: 320,
	},
	avatarArea: {
		width: '100%',
		marginBottom: token.marginXXS,
		'.storeAva': {
			borderRadius: token.borderRadius * 2,
			overflow: 'hidden',
		},
		'.ant-space-item': {
			marginBottom: 0,

			'.ant-typography': {
				marginBottom: 0,
			},
		},
	},
	subcription: {
		marginTop: -3,
		marginLeft: token.marginSM,
		h5: { marginTop: 0, marginBottom: -1, color: token.colorTextBase },
		'.subTitle1': {
			fontSize: token.fontSize,
			color: token.colorTextTertiary,
		},
		'.link': {
			fontSize: 13,
			color: token.colorTextLabel,
		},
	},
	addressArea: {
		display: 'flex',
		marginBottom: token.marginMD,
		'.ant-typography': {
			color: token.colorTextLabel,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: token.marginXXS,
		},
	},
	descriptionArea: {
		'.ant-typography': {
			lineHeight: 1.4,
		},
	},
	tags: { marginBottom: token.marginLG + 2 },
	acitons: {
		display: 'flex',
		'.more': {
			marginLeft: 12,
		},
	},
	infoTable: {
		'.ant-descriptions-row': {
			td: {
				paddingBottom: 3,
				'&:first-child': {
					width: '40%',
				},
			},
		},
	},
	infoTableInfo: {
		'.ant-descriptions-header': {
			marginBottom: token.marginXS,
		},
		'td, th': {
			padding: `${token.paddingXXS}px !important`,
		},
	},
}));
