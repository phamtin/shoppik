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
		},
		'.description': {
			fontSize: 15,
			color: token.colorTextSecondary,
		},
		'.ant-form-item': {
			marginBottom: token.marginMD,
		},
		'.block': {
			flex: 1,
		},
	},
}));

export default styles;
