import { createStyles } from 'antd-style';

const styles = createStyles(({ token }) => ({
	wrapper: {
		width: '100%',
	},

	categoryWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		minWidth: 400,
		marginBottom: token.marginLG,
	},
}));

export default styles;
