import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	flex: '0 1 68%',
	backgroundColor: 'white',
	boxShadow: 'rgba(0, 0, 0, 0.1) 2px 4px 28px 0px',
	borderRadius: token.borderRadiusLG * 2 - 4,
	overflow: 'hidden',
	'@media screen and (max-width: 991.8px)': {
		flex: '0 1 44% !important',
	},
	'.infoWrapper': {
		padding: token.marginLG,
		backgroundColor: 'white',
		borderRadius: token.borderRadiusLG,
		'.info': {
			marginLeft: token.marginXL,
			'.ant-form-item-label': {
				textAlign: 'left',
			},
		},
		'.ant-typography': {
			marginBottom: 0,
		},
		'.inputItem': {
			marginBottom: 0,
			span: {
				color: token.colorTextSecondary,
			},
		},
		'.spacer': {
			height: token.margin,
		},
	},
}));

export default styles;
