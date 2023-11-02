import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		'.ant-form-item-label': {
			paddingBottom: 0,
		},

		'.header': {
			marginBottom: token.marginMD,
		},
		h3: {
			marginBottom: 0,
			marginLeft: token.marginSM,
		},
		'.description': {
			fontSize: 15,
			marginLeft: token.marginSM,
			color: token.colorTextSecondary,
		},
		'.ant-form-item': {
			marginBottom: token.marginMD,
		},
		'.block': {
			flex: '1 1 50%',
		},
	},
}));

export default styles;
