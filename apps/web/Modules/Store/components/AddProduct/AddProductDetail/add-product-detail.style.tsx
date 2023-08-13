import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	variants: {
		'.textInput': {
			width: 150,
			minWidth: 150,
		},
		'.ant-form-item': {
			marginBottom: 0,
			marginRight: token.margin,
		},
	},
}));

export default styles;
